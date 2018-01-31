/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
import dateTime from 'utilities/timestamp-to-date-time'
import isNotEmpty from 'utilities/is-not-empty'
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    let info = params.info
    console.log(info)
    info.staffNo && formData.append('staffNo', info.staffNo)
    info.name && formData.append('name', info.name)
    info.nameKana && formData.append('nameKana', info.nameKana)
    info.nameJp && formData.append('nameJp', info.nameJp)
    info.sexIdList && formData.append('sexIdList', info.sexIdList)
    info.joinDayStart && formData.append('joinDayStart', info.joinDayStart)
    info.joinDayEnd && formData.append('joinDayEnd', info.joinDayEnd)
    info.practiceStartDateStart && formData.append('practiceStartDateStart', info.practiceStartDateStart)
    info.practiceStartDateEnd && formData.append('practiceStartDateEnd', info.practiceStartDateEnd)
    info.practiceEndDateStart && formData.append('practiceEndDateStart', info.practiceEndDateStart)
    info.practiceEndDateEnd && formData.append('practiceEndDateEnd', info.practiceEndDateEnd)
    info.trialStartDateStart && formData.append('trialStartDateStart', info.trialStartDateStart)
    info.trialStartDateEnd && formData.append('trialStartDateEnd', info.trialStartDateEnd)
    info.trialEndDateStart && formData.append('trialEndDateStart', info.trialEndDateStart)
    info.trialEndDateEnd && formData.append('trialEndDateEnd', info.trialEndDateEnd)
    info.formalDateStart && formData.append('formalDateStart', info.formalDateStart)
    info.formalDateEnd && formData.append('formalDateEnd', info.formalDateEnd)
    info.jobStatusIdList && formData.append('jobStatusIdList', info.jobStatusIdList)
    info.befworkAgeStart && formData.append('befworkAgeStart', info.befworkAgeStart)
    info.befworkAgeEnd && formData.append('befworkAgeEnd', info.befworkAgeEnd)
    info.cmpbefworkAgeStart && formData.append('cmpbefworkAgeStart', info.cmpbefworkAgeStart)
    info.cmpbefworkAgeEnd && formData.append('cmpbefworkAgeEnd', info.cmpbefworkAgeEnd)
    info.aftworkAgeStart && formData.append('aftworkAgeStart', info.aftworkAgeStart)
    info.aftworkAgeEnd && formData.append('aftworkAgeEnd', info.aftworkAgeEnd)
    info.workAgeStart && formData.append('workAgeStart', info.workAgeStart)
    info.workAgeEnd && formData.append('workAgeEnd', info.workAgeEnd)
    info.workDateStartinfo && formData.append('workDateStart', info.workDateStartinfo)
    info.workDateEnd && formData.append('workDateEnd', info.workDateEnd)
    info.graduateDateStart && formData.append('graduateDateStart', info.graduateDateStart)
    info.graduateDateEnd && formData.append('graduateDateEnd', info.graduateDateEnd)
    info.graduateSchool && formData.append('graduateSchool', info.graduateSchool)
    info.educationIdList && formData.append('educationIdList', info.educationIdList)
    info.major && formData.append('major', info.major)
    info.degreeIdList && formData.append('degreeIdList', info.degreeIdList)
    info.jpLevelIdList && formData.append('jpLevelIdList', info.jpLevelIdList)
    info.enLevelIdList && formData.append('enLevelIdList', info.enLevelIdList)
    info.nationIdList && formData.append('nationIdList', info.nationIdList)
    info.countryIdList && formData.append('countryIdList', info.countryIdList)
    info.ismarried && formData.append('ismarried', info.ismarried)
    info.hasbaby && formData.append('hasbaby', info.hasbaby)
    info.ispartied && formData.append('ispartied', info.ispartied)
    info.department && formData.append('department', info.department)
    info.dutyIdList && formData.append('dutyIdList', info.dutyIdList)
    info.tLevelIdList && formData.append('tLevelIdList', info.tLevelIdList)
    info.studentLineIdList && formData.append('studentLineIdList', info.studentLineIdList)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: originalData.data.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'staffNo',
                value: row.staffNo || '--'
              },
              {
                name: 'name',
                value: row.name || '--'
              },
              {
                name: 'nameKana',
                value: row.nameKana || '--'
              },
              {
                name: 'duty',
                value: row.duty || '--'
              },
              {
                name: 'jpLevel',
                value: row.jpLevel || '--'
              },
              {
                name: 'workAge',
                value: row.workAge || '--'
              },
              {
                name: 'department',
                value: row.department || '--'
              }
            ],
            operations: [
              {
                name: '查看',
                action: 'viewStaff',
                type: 'normal'
              },
              {
                name: '编辑',
                action: 'editStaff'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.staff.search, formData, success, fail, makeData)
  },
  getStaffInfo (params, success, fail) {
    function makeData (originalData) {
      let res = originalData.data
      console.log(res)
      for (let key in res) {
        if (key === 'sex' || key === 'trialResult' || key === 'jobStatus' || key === 'education' ||
          key === 'trainingMode' || key === 'degree' || key === 'jpLevel' || key === 'enLevel' ||
        key === 'nation' || key === 'country' || key === 'ismarried' || key === 'hasbaby' ||
        key === 'ispartied' || key === 'department' || key === 'duty' || key === 'tLevel' ||
        key === 'studentLine') {
          if (isNotEmpty(res[key])) {
            res[key] = res[key] + ''
          }
        } else if (key === 'birthday' || key === 'joinDay' || key === 'practiceStartDate' ||
        key === 'practiceEndDate' || key === 'trialStartDate' || key === 'trialEndDate' ||
        key === 'formalDate' || key === 'workDate' || key === 'graduateDate' || key === 'leaveDate') {
          if (isNotEmpty(res[key])) {
            res[key] = dateTime(res[key]).split(' ')[0]
          }
        } else if (key === 'busJpExpList') {
          res[key].map((item) => {
            if (isNotEmpty(item['startDate'])) {
              item['startDate'] = dateTime(item['startDate']).split(' ')[0]
            }
            if (isNotEmpty(item['endDate'])) {
              item['endDate'] = dateTime(item['endDate']).split(' ')[0]
            }
            return item
          })
        } else if (key === 'busProjectExpList') {
          res[key].map((item) => {
            if (isNotEmpty(item['startDate'])) {
              item['startDate'] = dateTime(item['startDate']).split(' ')[0]
            }
            if (isNotEmpty(item['endDate'])) {
              item['endDate'] = dateTime(item['endDate']).split(' ')[0]
            }
            item['projectId'] = item['projectId'] + ''
            return item
          })
        }
      }
      return res
    }
    let formData = new FormData()
    formData.append('id', params.id)
    httpHandler.post.bind(this)(uris.staff.selectInfoById, formData, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = {}
    for (let key in params.row) {
      if (key === 'birthday' || key === 'joinDay' || key === 'practiceStartDate' ||
        key === 'practiceEndDate' || key === 'trialStartDate' || key === 'trialEndDate' ||
        key === 'formalDate' || key === 'workDate' || key === 'graduateDate' || key === 'leaveDate') {
        if (isNotEmpty(params.row[key])) {
          formData[key] = Date.parse(new Date(params.row[key]).toDateString())
        }
      } else if (key === 'busJpExpList') {
        formData[key] = params.row[key].map((item) => {
          if (isNotEmpty(item['startDate'])) {
            item['startDate'] = dateTime(item['startDate']).split(' ')[0]
          }
          if (isNotEmpty(item['endDate'])) {
            item['endDate'] = dateTime(item['endDate']).split(' ')[0]
          }
          return item
        })
      } else if (key === 'busProjectExpList') {
        formData[key] = params.row[key].map((item) => {
          if (isNotEmpty(item['startDate'])) {
            item['startDate'] = dateTime(item['startDate']).split(' ')[0]
          }
          if (isNotEmpty(item['endDate'])) {
            item['endDate'] = dateTime(item['endDate']).split(' ')[0]
          }
          item['projectId'] = item['projectId'] + ''
          return item
        })
      } else {
        formData[key] = params.row[key]
      }
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.postJSON.bind(this)(uris.staff.save, formData, success, fail, makeData)
  }
}
