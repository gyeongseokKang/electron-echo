export interface CategoryInfo {
  main: "경조사비" | "자기계발비" | "의료비" | "개인경비";
  reason: string; // 구체적 사유 (예: 결혼, 출산, 입학 등)
}

export interface ExtractedInfo {
  date: string | null; // YYYY-MM-DD 또는 null
  amount: number | null; // 금액 (숫자, null 허용)
  event: string; // 행사명 또는 영수증 항목
  detail: string; // 사유 내용
}

export interface CongratulatoryStatement {
  item: string;
  detail: string;
  companySupport: number;
}

export interface SelfDevelopmentStatement {
  content: string;
  period: string;
  vendor: string;
  amount: number;
}

export interface MedicalStatement {
  hospital: string;
  treatment: string;
  copayment: number;
  date: string;
}

export type Statement =
  | {
      congratulatory: CongratulatoryStatement;
      selfDevelopment: null;
      medical: null;
    }
  | {
      congratulatory: null;
      selfDevelopment: SelfDevelopmentStatement;
      medical: null;
    }
  | { congratulatory: null; selfDevelopment: null; medical: MedicalStatement }
  | { congratulatory: null; selfDevelopment: null; medical: null }; // 개인경비 등

export interface RegulationInfo {
  appliedRule: string;
  notes: string[];
}

export interface ExpensePolicyResult {
  category: CategoryInfo;
  extracted: ExtractedInfo;
  statement: Statement;
  regulation: RegulationInfo;
}
