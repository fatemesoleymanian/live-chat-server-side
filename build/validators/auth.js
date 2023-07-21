const yup = require("yup");
//* Register Schema
const registerValidator = yup.object().shape({
    email: yup
        .string()
        .email("آدرس ایمیل نامعتبر است")
        .required("آدرس ایمیل الزامی می‌باشد"),
    password: yup
        .string()
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
        .required("رمز عبور الزامی می‌باشد"),
    name: yup
        .string()
        .required("نام و نام خانوادگی الزامی می‌باشد")
        .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
        .max(40, "نام و نام خانوادگی نباید بیشتر از 40 کاراکتر باشد"),
});
module.exports = {
    registerValidator
};
//# sourceMappingURL=auth.js.map