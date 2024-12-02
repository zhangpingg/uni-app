import service from '../service';

// 审核中心列表
export function apiAuditList(data) {
    return service.request({
        url: '/test/api/quality/supplier/apply/audit/auditList',
        method: 'post',
        data,
    });
}
