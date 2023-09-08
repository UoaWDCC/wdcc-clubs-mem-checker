import { Organisation } from "@prisma/client";
import IPage from "../../../client/src/types/IPage";
import IPageMetrics from "./IPageMetrics";

export default interface IDashboardPage {
  club: Organisation; // this doesn't contain the club logo, not sure where this is stored?
  pages: (IPage & {
    weblink: String;
    metrics: IPageMetrics;
  })[];
}
