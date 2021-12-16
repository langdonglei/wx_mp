Page({
    onLoad: function () {
        wx.login({
            success: res => {
                wx.request({
                    url: 'http://192.168.1.222/wxmp_php/api/login.php',
                    data: {
                        key: res.code
                    },
                    success: res => {
                        console.log('login.res', res)
                    }
                })
            }
        })
        // wx.checkSession({
        //     success:res=>console.log('res',res),
        //     fail:res=>console.log('err',res)
        // })
        // console.log(wx.getAccountInfoSync())
        // let a = wx.getUserInfo().then(res=>console.log(res))
        // console.log(a)
    },
    onChangeShowEnvChoose() {
        wx.showActionSheet({
            itemList: this.data.envList.map(i => i.alias),
            success: (res) => {
                this.onChangeSelectedEnv(res.tapIndex);
            },
            fail(res) {
                console.log(res.errMsg);
            },
            complete: res => {
                console.log(333)
            }
        });
    },
    onChangeSelectedEnv(index) {
        if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
            return;
        }
        const powerList = this.data.powerList;
        powerList.forEach(i => {
            i.showItem = false;
        })
        this.setData({
            selectedEnv: this.data.envList[index],
            powerList,
            haveCreateCollection: false
        })
    },
    jump(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.page
        });
    }
})