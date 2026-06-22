export const PIXEL_BLAST_VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const PIXEL_BLAST_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uJitter;
uniform float uEdgeFade;
uniform float uNoiseAmount;
uniform float uShapeType;
uniform float uTransparent;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;

const int MAX_RIPPLES = 8;
uniform vec2 uRipplePositions[MAX_RIPPLES];
uniform float uRippleTimes[MAX_RIPPLES];

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float ripple(vec2 uv) {
  float result = 0.0;
  for (int index = 0; index < MAX_RIPPLES; index++) {
    vec2 point = uRipplePositions[index];
    if (point.x < 0.0) continue;

    float elapsed = max(0.0, uTime - uRippleTimes[index]);
    float distanceFromPoint = distance(uv, point);
    float radius = elapsed * uRippleSpeed;
    float ring = exp(-pow((distanceFromPoint - radius) / uRippleThickness, 2.0));
    result = max(result, ring * exp(-elapsed * 0.75));
  }
  return result;
}

float shapeMask(vec2 point) {
  if (uShapeType < 0.5) return 1.0 - smoothstep(0.42, 0.5, max(abs(point.x), abs(point.y)));
  if (uShapeType < 1.5) return 1.0 - smoothstep(0.42, 0.5, length(point));
  if (uShapeType < 2.5) return step(abs(point.y), 0.5 - abs(point.x));
  return step(abs(point.x) + abs(point.y), 0.52);
}

void main() {
  vec2 pixelCoord = gl_FragCoord.xy / max(uPixelSize, 1.0);
  vec2 cell = floor(pixelCoord);
  vec2 local = fract(pixelCoord) - 0.5;
  vec2 uv = gl_FragCoord.xy / uResolution;

  float wave = sin((cell.x + cell.y) * 0.08 * uScale + uTime * 0.2);
  float noise = hash21(cell / max(uScale, 0.1) + wave);
  float jitter = (hash21(cell + 17.0) - 0.5) * uJitter;
  float coverage = step(1.0 - uDensity, noise + jitter);
  float pixelShape = shapeMask(local);
  float pulse = ripple(uv) * uRippleIntensity;
  float edge = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
  float fade = smoothstep(0.0, max(uEdgeFade, 0.001), edge);
  float alpha = max(coverage * pixelShape * 0.55, pulse * pixelShape) * fade;
  float grain = (hash21(cell + uTime) - 0.5) * uNoiseAmount;

  gl_FragColor = vec4(clamp(uColor + grain, 0.0, 1.0), uTransparent > 0.5 ? alpha : 1.0);
}
`;
