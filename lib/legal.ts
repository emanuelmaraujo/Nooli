export const legalIdentity = {
  brand: "Nooli",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Nooli",
  document: process.env.NEXT_PUBLIC_LEGAL_DOCUMENT || "",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
  supportWhatsapp: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "",
  privacyEmail:
    process.env.NEXT_PUBLIC_PRIVACY_EMAIL ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
    "",
};

export const commerceIdentityComplete = Boolean(
  legalIdentity.legalName &&
    legalIdentity.document &&
    legalIdentity.address &&
    legalIdentity.supportEmail
);
