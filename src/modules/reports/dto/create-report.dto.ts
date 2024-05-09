export enum Report_Status{
    Post_Is_Out_Content='post_is_out_content',
}
export class CreateReportDto {
    report_status:Report_Status;
    reporter_id:any;
    post_id:any;
}
