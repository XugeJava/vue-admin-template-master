import request from '@/utils/request'
export default {
  hospSetList(current, limit, hospitalSetQueryVo) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospitalSet/${current}/${limit}`,
      method: 'post',
      data: hospitalSetQueryVo
    })
  },
  deleteHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  deleteBatch(idList){
    return request({
      url:`/admin/hosp/hospitalSet/deleteBatch`,
      method:'delete',
      data:idList
    })
  },
  //锁定和取消锁定
  lockHospSet(id,status) {
    return request ({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },
  //添加医院设置
  saveHospSet(hospitalSet){
    return request({
      url:`/admin/hosp/hospitalSet/saveHospitalSet`,
      method:'post',
      data:hospitalSet
    })
  },
  //根据id获取医院设置
  getHospSet(id){
    return request({
      url:`/admin/hosp/hospitalSet/${id}`,
      methods:'get'
    })
  },
  //修改医院设置
  updateHospSet(hospitalSet) {
    return request ({
      url: `/admin/hosp/hospitalSet/update`,
      method: 'post',
      data: hospitalSet
    })
  }

}



