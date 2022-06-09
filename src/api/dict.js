import request from '@/utils/request'
export default{
  dictList(id){
    return request({
      url:`/admin/cmn/dict/findChildData/${id}`,
      methods:'get'
    })
  }
}
