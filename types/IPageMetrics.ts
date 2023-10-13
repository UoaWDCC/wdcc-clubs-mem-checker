import IMetricRecord from './IMetricRecord';

export default interface IPageMetrics {
  allTime: IMetricRecord;
  lastDay: IMetricRecord;
  last7Days: IMetricRecord;
  last30Days: IMetricRecord;
}
