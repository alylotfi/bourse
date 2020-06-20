const path = require('path')

module.exports = {
  inArray: (element, array) => {
    let length = array.length
    for (let i = 0; i < length; i++) {
      if (array[i] === element) return true
    }
    return false
  },
  env: {
    current: process.env.NODE_ENV || 'development',
    development: 'development',
    production: 'production',
  },
  redis: {
    prefix: 'sup_',
    list: {
      direction: {
        right: 'right',
        left: 'left',
      },
    },
  },
  behdad: {
    account: {
      wsdl: () => {
        if (constants.env.current === constants.env.production) {
          return path.join(__dirname, 'behdad', 'accountservice', 'accountservice.xml')
        } else {
          return 'https://85.133.186.11:8324/behdad/accountservice?wsdl'
        }
      },
      namespace: 'com.misc.bis.behdad.service',
      certificate: () => {
        if (constants.env.current === constants.env.production) {
          return {
            file: path.join(__dirname, 'behdad', 'certificate.pfx'),
            password: 'ShSoftco',
          }
        } else {
          return false
        }
      },
      logFolder: path.join(__dirname, 'behdad', 'logs'),
    },
    identifier: {
      // wsdl: 'https://85.133.186.11:8324/behdad/identifierservice?wsdl',
      wsdl: () => {
        if (constants.env.current === constants.env.production) {
          return path.join(__dirname, 'behdad', 'identifierservice', 'identifierservice.xml')
        } else {
          return 'https://85.133.186.11:8324/behdad/identifierservice?wsdl'
        }
      },
      namespace: 'com.misc.bis.behdad.service',
      certificate: () => {
        if (constants.env.current === constants.env.production) {
          return {
            file: path.join(__dirname, 'behdad', 'certificate.pfx'),
            password: 'ShSoftco',
          }
        } else {
          return false
        }
      },
      logFolder: path.join(__dirname, 'behdad', 'logs'),
      startDate: '2010-01-01 00:00:00',
      endDatePad: 1, //month
    },
    transaction: {
      redis: {
        list: {
          pending: 'transactions_pending_list',
          processed: 'transactions_processed_list',
        },
      },
      pageSize: 50,
      source: {
        behdad: 1,
      },
      method: {
        'General': 1,
        'Fee': 2,
        'Reversal': 3,
        'FeeReversal': 4,
        'ATM_Withdraw': 5,
        'ATM_Payment': 6,
        'ATM_Transfer': 7,
        'ATM_TeransferTo': 8,
        'ATM_TransferFrom': 9,
        'POS_Buy': 10,
        'POS_BillPayment': 11,
        'PinPad_Withdraw': 12,
        'PinPad_Transfer': 13,
        'PinPad_TransferTo': 14,
        'PinPad_TransferFrom': 15,
        'Internet_Buy': 16,
        'Internet_BillPayment': 17,
        'Internet_Transfer': 18,
        'Internet_TransferTo': 19,
        'Internet_TransferFrom': 20,
        'VRU_BillPayment': 21,
        'Mobile_Buy': 22,
        'Mobile_BillPayment': 23,
        'TransferFromRTGS': 24,
        'TransferToRTGS': 25,
        'TransferFromACH': 26,
        'TransferToACH': 27,
        'Incomming': 28,
        'Issue': 29,
        'Salary': 30,
        'Group_Deposit': 31,
        'Group_Withdraw': 32,
        'WaterBill': 33,
        'ElectricBill': 34,
        'GasBill': 35,
        'PhoneBill': 36,
        'MobileBill': 37,
        'MunicipalityBill': 38,
        'TaxBill': 39,
        'PoliceBill': 40,
      },
      media: {
        'CHQ': 1,
        'POR': 2,
        'PAY': 3,
        'POG': 4,
        '10': 5,
        '11': 6,
        '12': 7,
        '13': 8,
        '14': 9,
        '15': 10,
        '16': 11,
        '17': 12,
        '18': 13,
        '19': 14,
        '20': 15,
        '21': 16,
        '22': 17,
        '51': 18,
        '52': 19,
        '53': 20,
        '54': 21,
        '55': 22,
        '56': 23,
        '57': 24,
        '58': 25,
        '59': 26,
        '60': 27,
        '61': 28,
        '62': 29,
        '63': 30,
        '64': 31,
        '65': 32,
        '66': 33,
        '67': 34,
        '69': 35,
        '70': 36,
        '73': 37,
        '75': 38,
        '78': 39,
        '95': 40,
        'SCP': 41,
        'CHBRT': 42,
        'CHF': 43,
        'DPK': 44,
        'BNC': 45,
        'SYS': 46,
        'BTM': 47,
        'BPM': 48,
        'BFE': 49,
        'RBF': 50,
        'RBP': 51,
        'CHI': 52,
        'CHM': 53,
        'VAG': 54,
        'ISS': 55,
        'SPO': 56,
        'ATC': 57,
        'NAM': 58,
        'SAN': 59,
        'CRE': 60,
      },
      situation: {
        'DON': 1,
        'PND': 2,
        'UPD': 3,
        'EDP': 4,
        'CNL': 5,
      },
      typeGrade: {
        'MON': 1,
        'SBLC': 2,
        'UBLC': 3,
        'CRD': 4,
      },
      type: {
        'CDP': {'id': 1, 'effect': 'increase'},
        'DPS': {'id': 2, 'effect': 'increase'},
        'RDP': {'id': 3, 'effect': 'increase'},
        'CWT ': {'id': 4, 'effect': 'decrease'},
        'WTD ': {'id': 5, 'effect': 'decrease'},
        'RWD ': {'id': 6, 'effect': 'decrease'},
        'FEE ': {'id': 7, 'effect': 'decrease'},
        'SBLC ': {'id': 8, 'effect': 'decrease'},
        'SUBL': {'id': 9, 'effect': 'increase'},
        'UBLC ': {'id': 10, 'effect': 'decrease'},
        'UUBL ': {'id': 11, 'effect': 'increase'},
        'ICC ': {'id': 12, 'effect': 'increase'},
        'DCC ': {'id': 13, 'effect': 'decrease'},
      },
    },
  },
  pagination: {
    defaults: {
      page: 1,
      pageSize: 10,
      order: 'id',
      orderType: 'desc',
    },
    orderTypes: ['acs', 'desc'],
  },
  logKeys: {
    dbError: 'dbError',
  },
  user: {
    auth: {
      preSalt: 'SUP+KbPeShV',
      postSalt: 'RgUkXp2sSUP',
      token: {
        s1: 'WmYq3t6w',
        s2: 'VkYp3s6v',
        s3: 'MbQeThWm',
        s4: 'jXn2r5u8',
        s5: 'bPdSgVkY',
        expirationDuration: 15,
      },
      openWebServices: [
        'post:/v1/user/login',
        'get:/v1/user/password/forget',
        'get:/v1/behdad/test',
      ],
      noUpdateWebServices: [
        'post:/v1/user/update',
      ],
    },
    role: {
      level: {
        admin: 1,
        headquarter: 2,
        region: 3,
        area: 4,
      },
      access: {
        method: {
          get: 1,
          post: 2,
          patch: 3,
          delete: 4,
          options: 'options',
        },
      },
    },
    menu: {
      permittedAction: {
        view: 1,
        list: 1,
        create: 1,
        update: 1,
        delete: 1,
        activate: 1,
        deactivate: 1,
        changePassword: 1,
      },
    },
    situation: {
      pending: 1,
      accepted: 2,
      rejected: 3,
      blocked: 4,
      blackListed: 5,
    },
  },
  flags: {
    active: 1,
    deActive: 2,
    deleted: 3,
  },
  chartLevels: {
    levels: {
      headquarter: 0,
      region: 1,
      area: 2,
    },
  },
}