import { Report_Status } from "src/common/enum/report_status.enum";

export class CreateReportDto {
    report_status:Report_Status;

    post_id:any;
}
