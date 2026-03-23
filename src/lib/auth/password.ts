export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;

type PasswordRequirementDefinition = {
  id: "length" | "uppercase" | "lowercase" | "number" | "symbol";
  label: string;
  validationMessage: string;
  test: (password: string) => boolean;
};

export type PasswordStrengthLabel = "Weak" | "Fair" | "Good" | "Strong";

export type PasswordChecks = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  symbol: boolean;
};

export const PASSWORD_REQUIREMENTS: PasswordRequirementDefinition[] = [
  {
    id: "length",
    label: "At least 8 characters",
    validationMessage: "Password must be at least 8 characters long",
    test: (password) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    validationMessage: "Password must include at least one uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    validationMessage: "Password must include at least one lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "At least one number",
    validationMessage: "Password must include at least one number",
    test: (password) => /\d/.test(password),
  },
  {
    id: "symbol",
    label: "At least one special character",
    validationMessage: "Password must include at least one special character",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function getPasswordChecks(password: string): PasswordChecks {
  return PASSWORD_REQUIREMENTS.reduce<PasswordChecks>(
    (checks, requirement) => {
      checks[requirement.id] = requirement.test(password);
      return checks;
    },
    {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    },
  );
}

export function getPasswordValidationError(password: string): string | null {
  if (!password) {
    return "Password is required";
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return "Password is too long";
  }

  const checks = getPasswordChecks(password);
  const unmetRequirement = PASSWORD_REQUIREMENTS.find((requirement) => !checks[requirement.id]);
  return unmetRequirement?.validationMessage ?? null;
}

export function getPasswordStrength(password: string): {
  label: PasswordStrengthLabel | null;
  percent: number;
  satisfiedCount: number;
} {
  if (!password) {
    return {
      label: null,
      percent: 0,
      satisfiedCount: 0,
    };
  }

  const checks = getPasswordChecks(password);
  const satisfiedCount = Object.values(checks).filter(Boolean).length;

  if (satisfiedCount <= 2) {
    return {
      label: "Weak",
      percent: 25,
      satisfiedCount,
    };
  }

  if (satisfiedCount === 3) {
    return {
      label: "Fair",
      percent: 50,
      satisfiedCount,
    };
  }

  if (satisfiedCount === PASSWORD_REQUIREMENTS.length && password.length >= 12) {
    return {
      label: "Strong",
      percent: 100,
      satisfiedCount,
    };
  }

  return {
    label: "Good",
    percent: 78,
    satisfiedCount,
  };
}
