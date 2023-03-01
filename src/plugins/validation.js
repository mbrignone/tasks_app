import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from "vee-validate";

import { required, min, max, email, confirmed } from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos_required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("email", email);
    defineRule("password_match", confirmed);

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          email: `The field ${ctx.field} must be a valid email.`,
          password_match: `The passwords don't match.`,
          tos_required: `You must accept the Terms of Service.`
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      }
    });
  }
};
