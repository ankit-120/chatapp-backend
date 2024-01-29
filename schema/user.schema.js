const userSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    fullname: { type: "string", minLength: 3 },
    email: { type: "string" },
    password: { type: "string", minLength: 3, maxLength: 15 },
  },
  required: ["username", "fullname", "email", "password"],
  additionalProperties: false,
};

export { userSchema };
