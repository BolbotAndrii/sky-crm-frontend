export const generateVariables = () => {
  const obj = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    lead_password: '',
    country: '',
    language: '',
    domain: '',
    click_id: '',
    lang: '',
    buyer: '',
    account: '',
    country_code: '',
    offer: '',
    comment: '',
    geo: '',
    ip: '',
    phone_code: '',
    current_status: '',
    affiliate: '',
    status: '',
    param_1: '',
    param_2: '',
    param_3: '',
    param_4: '',
    param_5: '',
    param_6: '',
    param_7: '',
    param_8: '',
    param_9: '',
    param_10: '',
    param_11: '',
    param_12: '',
    param_13: '',
    param_14: '',
    param_15: '',
  }

  return Object.keys(obj).map(key => ({ label: key, value: key }))
}

export const arrayToObject = (array: []) => {
  if (!Array.isArray(array)) return array

  const resultObject = {}

  if (Array.isArray(array)) {
    array?.forEach(item => {
      const key = item?.name || ''
      const value = item?.value || ''
      resultObject[key] = value
    })
  }

  return resultObject
}
