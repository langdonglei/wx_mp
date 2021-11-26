const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  switch (event.action) {
    case 'sendSubscribeMessage': {
      return sendSubscribeMessage(event)
    }
  }
}

async function sendSubscribeMessage(event) {
  const {
    OPENID
  } = cloud.getWXContext()

  const {
    templateId
  } = event

  const sendResult = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    templateId,
    miniprogram_state: 'developer',
    page: 'pages/openapi/openapi',
    // 此处字段应修改为所申请模板所要求的字段
    data: {
      thing1: {
        value: '咖啡',
      },
      time3: {
        value: '2020-01-01 00:00',
      },
    }
  })

  return sendResult
}
