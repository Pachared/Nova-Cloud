export const PIXEL_BLAST_VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const PIXEL_BLAST_FRAGMENT_SHADER = `
precision highp float;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int uShapeType;

const int SHAPE_CIRCLE = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND = 3;
const int MAX_CLICKS = 10;

uniform vec2 uClickPos[MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 value) {
  value = floor(value);
  return fract(value.x / 2.0 + value.y * value.y * 0.75);
}

#define Bayer4(value) (Bayer2(0.5 * (value)) * 0.25 + Bayer2(value))
#define Bayer8(value) (Bayer4(0.5 * (value)) * 0.25 + Bayer2(value))

float hash11(float value) {
  return fract(sin(value) * 43758.5453);
}

float vnoise(vec3 point) {
  vec3 cell = floor(point);
  vec3 local = fract(point);
  vec3 smoothLocal = local * local * local * (local * (local * 6.0 - 15.0) + 10.0);
  float n000 = hash11(dot(cell, vec3(1.0, 57.0, 113.0)));
  float n100 = hash11(dot(cell + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n010 = hash11(dot(cell + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n110 = hash11(dot(cell + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n001 = hash11(dot(cell + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n101 = hash11(dot(cell + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n011 = hash11(dot(cell + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n111 = hash11(dot(cell + vec3(1.0), vec3(1.0, 57.0, 113.0)));
  float x0 = mix(mix(n000, n100, smoothLocal.x), mix(n010, n110, smoothLocal.x), smoothLocal.y);
  float x1 = mix(mix(n001, n101, smoothLocal.x), mix(n011, n111, smoothLocal.x), smoothLocal.y);
  return mix(x0, x1, smoothLocal.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float time) {
  vec3 point = vec3(uv * uScale, time);
  float amplitude = 1.0;
  float frequency = 1.0;
  float sum = 1.0;
  for (int index = 0; index < 5; index++) {
    sum += amplitude * vnoise(point * frequency);
    frequency *= 1.25;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 point, float coverage) {
  float distanceFromCenter = length(point - 0.5) - sqrt(coverage) * 0.25;
  float antiAlias = 0.5 * fwidth(distanceFromCenter);
  return coverage * (1.0 - smoothstep(-antiAlias, antiAlias, distanceFromCenter * 2.0));
}

float maskTriangle(vec2 point, vec2 id, float coverage) {
  if (mod(id.x + id.y, 2.0) > 0.5) point.x = 1.0 - point.x;
  float distanceFromEdge = point.y - sqrt(coverage) * (1.0 - point.x);
  return coverage * clamp(0.5 - distanceFromEdge / fwidth(distanceFromEdge), 0.0, 1.0);
}

float maskDiamond(vec2 point, float coverage) {
  return step(abs(point.x - 0.49) + abs(point.y - 0.49), sqrt(coverage) * 0.564);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 pixelId = floor(fragCoord / uPixelSize);
  vec2 pixelUv = fract(fragCoord / uPixelSize);
  float cellPixelSize = 8.0 * uPixelSize;
  vec2 cellCoord = floor(fragCoord / cellPixelSize) * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);
  float feed = fbm2(uv, uTime * 0.05) * 0.5 - 0.65 + (uDensity - 0.5) * 0.3;

  if (uEnableRipples == 1) {
    for (int index = 0; index < MAX_CLICKS; index++) {
      vec2 click = uClickPos[index];
      if (click.x < 0.0) continue;
      vec2 clickUv = ((click - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution) * vec2(aspectRatio, 1.0);
      float elapsed = max(uTime - uClickTimes[index], 0.0);
      float ring = exp(-pow((distance(uv, clickUv) - uRippleSpeed * elapsed) / uRippleThickness, 2.0));
      feed = max(feed, ring * exp(-elapsed) * exp(-10.0 * distance(uv, clickUv)) * uRippleIntensity);
    }
  }

  float coverage = step(0.5, feed + Bayer8(fragCoord / uPixelSize) - 0.5);
  float hash = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  coverage *= 1.0 + (hash - 0.5) * uPixelJitter;
  float mask = coverage;
  if (uShapeType == SHAPE_CIRCLE) mask = maskCircle(pixelUv, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) mask = maskTriangle(pixelUv, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND) mask = maskDiamond(pixelUv, coverage);

  vec2 normalized = gl_FragCoord.xy / uResolution;
  float edge = min(min(normalized.x, normalized.y), min(1.0 - normalized.x, 1.0 - normalized.y));
  mask *= smoothstep(0.0, max(uEdgeFade, 0.0001), edge);
  vec3 srgbColor = mix(uColor * 12.92, 1.055 * pow(uColor, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, uColor));
  fragColor = vec4(srgbColor, mask);
}
`;
