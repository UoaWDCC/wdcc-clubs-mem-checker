import { Organisation } from '@prisma/client';
import IPage from './IPage';
import IPageMetrics from './IPageMetrics';
import { IMemberCountByPageId } from '../client/src/types/IMemberCountByPageId';

export default interface IDashboardPage {
  club: Organisation; // this doesn't contain the club logo, not sure where this is stored?
  pages: (IPage & {
    metrics: IPageMetrics;
  })[];
  clubAdmins: string[];
  memberCountByPageId: IMemberCountByPageId;
}
