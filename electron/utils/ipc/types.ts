export interface EventPayloadMapping {
  statistics: any;
  changeView: any;
  getStaticData: any;
  sendFrameAction: any;
  // 기타 이벤트 타입 추가
}

export interface ElectronAPI {
  subscribeStatistics: (callback: (stats: any) => void) => () => void;
  subscribeChangeView: (callback: (view: any) => void) => () => void;
  getStaticData: () => Promise<any>;
  sendFrameAction: (payload: any) => void;
}
