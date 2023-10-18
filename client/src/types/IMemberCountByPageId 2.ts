export interface IMemberCountByPageId {
  [pageID: string]: { UniqueColumnName: string; totalMembers: number };
}
