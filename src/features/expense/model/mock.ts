import { ExpensePolicyResult } from "./expense-policy.types";

// 테스트용 mock 데이터 (4가지 케이스)
export const mockResults: ExpensePolicyResult[] = [
  // ① 개인경비
  {
    category: { main: "개인경비", reason: "일반 사무용품 구입" },
    extracted: {
      date: "2024-06-10",
      amount: 35000,
      event: "문구점 영수증",
      detail: "볼펜, 노트 등 사무용품 구입",
    },
    statement: { congratulatory: null, selfDevelopment: null, medical: null },
    regulation: {
      appliedRule: "개인경비 - 사무용품 구입 실비 지급",
      notes: ["영수증 첨부 필수", "사유 명확히 기재 필요"],
    },
  },
  // ② 자기계발비
  {
    category: { main: "자기계발비", reason: "영어 회화 강의 수강" },
    extracted: {
      date: "2024-05-15",
      amount: 200000,
      event: "ABC 어학원",
      detail: "영어 회화 강의 수강료",
    },
    statement: {
      congratulatory: null,
      selfDevelopment: {
        content: "영어 회화 강의 수강",
        period: "2024-05-01 ~ 2024-05-31",
        vendor: "ABC 어학원",
        amount: 200000,
      },
      medical: null,
    },
    regulation: {
      appliedRule: "입사 2년 미만 - 연 1회 200,000원",
      notes: ["영수증 첨부 필요", "최종 정산 여부는 인사팀 확인"],
    },
  },
  // ③ 의료비
  {
    category: { main: "의료비", reason: "치과 진료" },
    extracted: {
      date: "2024-06-05",
      amount: 30000,
      event: "서울치과",
      detail: "스케일링 진료",
    },
    statement: {
      congratulatory: null,
      selfDevelopment: null,
      medical: {
        hospital: "서울치과",
        treatment: "스케일링",
        copayment: 30000,
        date: "2024-06-05",
      },
    },
    regulation: {
      appliedRule: "의료비 - 본인부담금 실비 지급",
      notes: ["진료 영수증 첨부", "비급여 항목 제외"],
    },
  },
  // ④ 경조사비 (기존 예시)
  {
    category: { main: "경조사비", reason: "자녀 결혼" },
    extracted: {
      date: "2024-06-01",
      amount: 100000,
      event: "자녀 결혼식",
      detail: "자녀 결혼",
    },
    statement: {
      congratulatory: {
        item: "자녀 결혼",
        detail: "2024년 6월 1일 결혼식",
        companySupport: 100000,
      },
      selfDevelopment: null,
      medical: null,
    },
    regulation: {
      appliedRule: "자녀 결혼 - 100,000원 지급",
      notes: [
        "관계: 자녀",
        "날짜 명확히 기재 필요",
        "최종 정산 여부는 인사팀 확인",
      ],
    },
  },
];
