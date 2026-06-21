import type { IconType } from "react-icons";
import { FiActivity, FiAlertCircle, FiBell, FiClipboard, FiClock, FiFileText, FiGlobe, FiShield, FiUserCheck } from "react-icons/fi";

export type Signal = {
  title: string;
  detail: string;
  label: string;
  Icon: IconType;
};

export const signalColumns: Signal[][] = [
  [
    { title: "ระบุเจ้าของ release", detail: "เห็นผู้รับผิดชอบของแต่ละ deployment ก่อนเริ่ม rollout.", label: "Ownership", Icon: FiUserCheck },
    { title: "สรุปการเปลี่ยนแปลง", detail: "ทีมเห็นสิ่งที่เปลี่ยนไปพร้อมบริบทของ release เดียวกัน.", label: "Changes", Icon: FiFileText },
    { title: "ลิงก์ preview สำหรับรีวิว", detail: "แชร์ environment ที่ตรวจสอบได้ให้คนที่เกี่ยวข้องโดยตรง.", label: "Review", Icon: FiGlobe },
    { title: "บันทึกการอนุมัติ", detail: "เก็บสถานะการอนุมัติไว้กับ release ที่ทีมกำลังติดตาม.", label: "Approval", Icon: FiShield },
  ],
  [
    { title: "แจ้งเตือนสิ่งที่ต้องดู", detail: "ส่งสัญญาณให้ทีมเมื่อ release ต้องการการตรวจสอบเพิ่มเติม.", label: "Alerts", Icon: FiBell },
    { title: "ติดตามเหตุการณ์สำคัญ", detail: "รวมเหตุการณ์ของ release ไว้ใน timeline ที่ทีมอ่านร่วมกัน.", label: "Timeline", Icon: FiActivity },
    { title: "บันทึกการตัดสินใจ", detail: "ย้อนดูการเปลี่ยนสถานะและเหตุผลของ release ได้ตามเวลา.", label: "Audit", Icon: FiClipboard },
    { title: "กำหนดเวลาติดตาม", detail: "เห็นช่วงที่ release อยู่ระหว่างตรวจสอบหรือรอการดำเนินการ.", label: "Follow-up", Icon: FiClock },
  ],
  [
    { title: "ประวัติ release ที่ค้นหาได้", detail: "เปิดดูสิ่งที่เกิดขึ้นกับ deployment ก่อนหน้าได้ทันที.", label: "History", Icon: FiClock },
    { title: "สรุปผลกระทบ", detail: "ให้ทีมรับรู้ว่า service ใดและใครได้รับผลจากการเปลี่ยนแปลง.", label: "Context", Icon: FiAlertCircle },
    { title: "ติดตามสถานะร่วมกัน", detail: "ทุกคนเห็นความคืบหน้าจากหน้าข้อมูลเดียวกัน.", label: "Visibility", Icon: FiActivity },
    { title: "ส่งมอบพร้อมหลักฐาน", detail: "ให้ข้อมูล release อยู่พร้อมสำหรับการทบทวนของทีม.", label: "Record", Icon: FiFileText },
  ],
];
