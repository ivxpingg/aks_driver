<template>
    <div class="registerPage-container">
        <van-sticky :offset-top="0">
            <van-nav-bar class="nav-bar-main"
                         left-arrow
                         title="注册" @click-left="back">
            </van-nav-bar>
        </van-sticky>

        <div class="page-body">
            <div class="step-one" v-if="step === 'one'">
                <div class="form-title">
                    <span class="text">基础信息</span>
                </div>
                <div class="field-group">
                    <van-field
                            v-model="formData.name"
                            label="姓 名"
                            placeholder="姓名">
                    </van-field>
                    <van-field
                            v-model="formData.birthday"
                            label="出生年月"
                            readonly
                            @click="datetimePicker_show = true"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.nation"
                            label="民 族"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.idNumber"
                            label="身份证"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.companyName"
                            label="任职单位"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.phone"
                            label="联系电话"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.address"
                            label="家庭住址"
                            placeholder="">
                    </van-field>
                </div>

                <div class="form-title">
                    <span class="text">家庭成员信息</span>
                </div>

                <div class="field-group">
                    <van-field
                            v-model="formData.fatherName"
                            label="父 亲"
                            placeholder="姓名">
                    </van-field>
                    <van-field
                            v-model="formData.fatherNation"
                            label="民 族"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.fatherIdNumber"
                            label="身份证"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.motherName"
                            label="母 亲"
                            placeholder="姓名">
                    </van-field>
                    <van-field
                            v-model="formData.motherNation"
                            label="民 族"
                            placeholder="">
                    </van-field>
                    <van-field
                            v-model="formData.motherIdNumber"
                            label="身份证"
                            placeholder="">
                    </van-field>
                </div>

                <div class="form-title">
                    <span class="text">车辆信息</span>
                </div>
                <div class="field-group">
                    <van-field
                            v-model="formData.licensePlate"
                            label="车牌号"
                            placeholder="">
                    </van-field>
                    <van-field
                            label-width="50"
                            label="人车合一照片">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_personCar"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                </div>

                <div class="btn">
                    <van-button round type="info"
                                color="rgb(26,216,226)"
                                size="large"
                                :disabled="!agree"
                                @click="nextStep" style="margin-top: 20px;">下一步</van-button>
                </div>

                <div style="padding: 0px 20px 40px;">
                    <van-checkbox v-model="agree" shape="square" icon-size="14">已阅读并同意
                        <span style="color: #1989fa" @click="$router.push({name: 'userPolicy'})">《用户协议》</span>
                        <span>和</span>
                        <span style="color: #1989fa" @click="$router.push({name: 'privacyPolicy'})">《隐私协议》</span></van-checkbox>
                </div>

            </div>

            <div class="step-two" v-if="step === 'two'">
                <div class="form-title">
                    <span class="text">证明材料</span>
                </div>
                <div class="field-group">
                    <van-field
                            label-width="50"
                            label="政审表">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_political"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                    <van-field
                            label-width="50"
                            label="三年无重大失误证明">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_noAccident"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                    <van-field
                            label-width="50"
                            label="从业资格证">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_qualificate"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                    <van-field
                            label-width="50"
                            label="体检表">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_health"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                    <van-field
                            label-width="50"
                            label="驾驶证">
                        <div slot="input" style="padding: 8px 10px;">
                            <van-uploader v-model="fileList_driverLicense"
                                          multiple></van-uploader>
                        </div>
                    </van-field>
                </div>
                <div class="btn">
                    <van-button round type="info"
                                color="rgb(26,216,226)"
                                size="large"
                                @click="submit" style="margin-top: 20px;">提交审核</van-button>
                </div>
            </div>

            <div class="step-three success-message" v-if="step === 'three'">
                <van-icon name="passed" size="45px" color="#19be6b"/><br/>
                提交审核成功，<br/>请耐心等待管理员通知！
            </div>
        </div>


        <van-overlay :show="overlayValue" z-index="99" style="text-align: center;">
            <van-loading type="spinner" vertical style="margin-top: 50%;">上传中...</van-loading>
        </van-overlay>

        <van-popup
                v-model="datetimePicker_show"
                position="bottom">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    @cancel="datetimePicker_show = false"
                    @confirm="dateOk"></van-datetime-picker>
        </van-popup>

        <van-dialog v-model="show"
                    title="用户协议及隐私政策"
                    confirm-button-text="同意"
                    confirm-button-color="#07c160"
                    cancel-button-text="暂不使用"
                    @confirm="agreeInfo"
                    show-cancel-button>
            <div style="padding: 16px 20px">
                请您务必审慎阅读、充分理解"用户协议"和"隐私协议",各条款。您可以阅读：
                <div><span style="color: #1989fa" @click="$router.push({name: 'userPolicy'})">《用户协议》</span></div>
                <div><span style="color: #1989fa" @click="$router.push({name: 'privacyPolicy'})">《隐私协议》</span></div>
                了解详细信息，如您同意，请点击同意开始接受我们的服务！
            </div>
        </van-dialog>
    </div>
</template>

<script>
    import comMixin from '../../../lib/mixins/comMixin';
    import uploadMixin from './uploadMixin/uploadMixin';
    export default {
        name: 'vRegisterPage', // 注册页面
        mixins: [uploadMixin, comMixin],
        computed: {
            fileIds() {
                return this.formData.personCarFileId
                    .concat(this.formData.politicalFileId)
                    .concat(this.formData.noAccidentFileId)
                    .concat(this.formData.qualificateFileId)
                    .concat(this.formData.healthFileId)
                    .concat(this.formData.driverLicenseFileId);
            }
        },
        data () {
            return {
                show: true,
                agree: false,
                datetimePicker_show: false,
                currentDate: new Date(),
                step: 'one', // 第几步
                overlayValue: false,
                formData: {
                    // 基础信息
                    name: '', //
                    birthday: '', //
                    nation: '', //
                    idNumber: '', //
                    companyName: '', //
                    phone: '', //
                    address: '', // 家庭住址
                    // 家庭成员信息
                    fatherName: '', //
                    fatherNation: '', //
                    fatherIdNumber: '', //
                    motherName: '', //
                    motherNation: '', //
                    motherIdNumber: '', //
                    // 车辆信息
                    licensePlate: '', //  车牌号码
                    // personCarFileId: [], //  人车合一照片
                    // // 证明材料
                    // politicalFileId: [], // 政审表
                    // noAccidentFileId: [], // 三年无重大失误证明
                    // qualificateFileId: [], // 从业资格证
                    // healthFileId: [], // 体检表
                    // driverLicenseFileId: [], // 驾驶证

                    fileIds: []  // 所有图片fileId
                },

                fileList_personCar: [], //  人车合一照片
                fileList_political: [], // 政审表
                fileList_noAccident: [], // 三年无重大失误证明
                fileList_qualificate: [], // 从业资格证
                fileList_health: [], // 体检表
                fileList_driverLicense: [], // 驾驶证
            };
        },
        methods: {
            back() {
                if (this.step === 'one') {
                    this.com_goto('login');
                }
                if (this.step === 'two') {
                    this.step = 'one';
                }
                if (this.step === 'three') {
                    this.com_goto('login');
                }
            },
            dateOk(value) {
                this.datetimePicker_show = false;
                this.formData.birthday = this.$moment(value).format('YYYY-MM-DD');
            },

            // 校验第一步信息
            validateStepOne() {
                let reValue = true;
                if (this.formData.name.trim() === '') {
                    this.$toast('姓名不能为空');
                    reValue = false;
                }
                else if (this.formData.birthday.trim() === '') {
                    this.$toast('出生年月不能为空');
                    reValue = false;
                }
                else if (this.formData.nation.trim() === '') {
                    this.$toast('民族不能为空');
                    reValue = false;
                }
                else if (this.formData.idNumber.trim() === '') {
                    this.$toast('身份证不能为空');
                    reValue = false;
                }
                else if (this.formData.idNumber.trim() === '') {
                    this.$toast('身份证不能为空');
                    reValue = false;
                }
                else if (this.formData.companyName.trim() === '') {
                    this.$toast('任职单位不能为空');
                    reValue = false;
                }
                else if (this.formData.phone.trim() === '') {
                    this.$toast('联系电话不能为空');
                    reValue = false;
                }
                else if (this.formData.address.trim() === '') {
                    this.$toast('家庭住址不能为空');
                    reValue = false;
                }

                else if (this.formData.fatherName.trim() === '') {
                    this.$toast('父亲姓名不能为空');
                    reValue = false;
                }
                else if (this.formData.fatherNation.trim() === '') {
                    this.$toast('父亲民族不能为空');
                    reValue = false;
                }
                else if (this.formData.fatherIdNumber.trim() === '') {
                    this.$toast('父亲身份证不能为空');
                    reValue = false;
                }
                else if (this.formData.motherName.trim() === '') {
                    this.$toast('母亲姓名不能为空');
                    reValue = false;
                }
                else if (this.formData.motherNation.trim() === '') {
                    this.$toast('母亲民族不能为空');
                    reValue = false;
                }
                else if (this.formData.motherIdNumber.trim() === '') {
                    this.$toast('母亲身份证不能为空');
                    reValue = false;
                }

                else if (this.formData.licensePlate.trim() === '') {
                    this.$toast('车牌号不能为空');
                    reValue = false;
                }
                else if (this.fileList_personCar.length === 0) {
                    this.$toast('请上传人车合一照片');
                    reValue = false;
                }
                else {
                    reValue = true;
                }

                return reValue;
            },
            // 下一步
            nextStep() {
                if (this.validateStepOne()) {
                    this.step = 'two';
                }
            },
            // 校验第二步信息
            validateStepTwo() {
                let reValue = true;
                if (this.fileList_political.length === 0) {
                    this.$toast('请上传政审表');
                    reValue = false;
                }
                else if (this.fileList_noAccident.length === 0) {
                    this.$toast('请上传三年无重大失误证明');
                    reValue = false;
                }
                else if (this.fileList_qualificate.length === 0) {
                    this.$toast('请上传从业资格证');
                    reValue = false;
                }
                else if (this.fileList_health.length === 0) {
                    this.$toast('请上传体检表');
                    reValue = false;
                }
                else if (this.fileList_driverLicense.length === 0) {
                    this.$toast('请上传驾驶证');
                    reValue = false;
                }
                else {
                    reValue = true;
                }
                return reValue;
            },

            // 提交审核按钮
            submit() {
                if (this.validateStepTwo()) {
                    this.overlayValue = true;
                    this.uploadAllPicture();
                }
            },
            // 上传所有图片
            uploadAllPicture() {
                return Promise.all(this.getPromiseList()).then((values) => {
                    this.formData.fileIds = [];
                    values.forEach((res) => {
                        this.formData.fileIds.push(res.data.fileId);
                    });
                    this.save();
                }).catch((error) => {
                    this.overlayValue = false;
                    this.$notify('文件上传失败！');
                    console.dir(error);
                });
            },
            getPromiseList() {
                let promiseList = [];
                this.fileList_personCar.forEach((file) => {
                    promiseList.push(this.saveFile('person_car', file));
                });

                this.fileList_political.forEach((file) => {
                    promiseList.push(this.saveFile('political', file));
                });

                this.fileList_noAccident.forEach((file) => {
                    promiseList.push(this.saveFile('no_accident', file));
                });

                this.fileList_qualificate.forEach((file) => {
                    promiseList.push(this.saveFile('qualificate', file));
                });

                this.fileList_health.forEach((file) => {
                    promiseList.push(this.saveFile('health', file));
                });

                this.fileList_driverLicense.forEach((file) => {
                    promiseList.push(this.saveFile('driver_license', file));
                });
                return promiseList;
            },
            save() {
                this.$http({
                    method: 'post',
                    url: '/driverRegister',
                    data: this.formData
                }).then((res) => {
                    this.overlayValue = false;
                    if (res.code === 'SUCCESS') {
                        this.step = 'three';
                    }
                    else {
                    }
                }).catch(() => {
                    this.overlayValue = false;
                })
            },
            agreeInfo() {
                this.show = false;
                this.agree = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .registerPage-container {
        .page-body {
            .step-one, .step-two {
                background-color: #FFF;
            }
            .form-title {
                position: relative;
                padding-left: 30px;
                background-color: #FFF;
                line-height: 36px;
                &:after {
                    position: absolute;
                    left: 20px;
                    top: 10px;
                    display: block;
                    content: " ";
                    width: 6px;
                    height: 16px;
                    background-color: #1AD8E2;
                    border-radius: 3px;
                }
                .text {
                    font-size: 14px;
                    font-weight: 700;
                }

            }

            .btn {
                padding: 10px 20px 30px;
            }

            .success-message {
                font-size: 18px;
                text-align: center;
                padding-top: 250px;
            }
        }
    }
</style>
