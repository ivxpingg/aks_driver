export default {
    data() {
        return {

        }
    },
    methods: {

        // 上传文件
        saveFile(fileType, file) {
            return new Promise((resolve, reject) => {
                let param = new FormData();
                param.append('name','file')
                param.append('file', file.file);
                this.$http({
                    method: 'post',
                    url: '/file/upload/' + fileType,
                    headers: { "Content-Type": "multipart/form-data" },
                    data: param
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        resolve(res);
                    }
                    else {
                        this.$notify('文件上传失败！');
                        reject(fileType);
                    }
                }).catch(() => {
                    reject(fileType);
                })
            })
        },
    }
}