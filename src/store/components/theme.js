const IMAGE_SERVER = "https://sipa-canvas.s3.us-east-2.amazonaws.com/canvas-images/"

export default {
  state: {
    theme: { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "#008EE2" },
    themeOptions: [
      // { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "#008EE2" },
      { option: "Columbia", banner: 'CU01', slim: 'CU01_Slim', wide: 'STV1_BannerBlue', logo: IMAGE_SERVER + "CU_Default_Logo.png", primary: "#008EE2" },
      { option: "SIPA", banner: 'SIPA', wide: 'WIDE', slim: 'SIPA_Slim', logo: IMAGE_SERVER + "SipaLogo2.png", primary: "#008EE2" },
      { option: "Social Work", banner: 'SSW', slim: 'SSW_Slim', logo: IMAGE_SERVER + "SSW_logo.png", primary: "#008EE2" },
      { option: "Mailman", banner: 'MM', slim: 'MM_Slim', logo: IMAGE_SERVER + "MM_logo2.png", primary: "#008EE2" },
      // { option: "Istari", banner: 'Banner_Istari', slim: 'Banner_Istari_Slim', logo: IMAGE_SERVER + "Istari_Logo.png", primary: "#1F1347" },
      // { option: "Acountability Lab", banner: 'Banner_AL', slim: 'Banner_AL_Slim', logo: IMAGE_SERVER + "AL_Logo.png", primary: "#671E20" },
      // { option: "Center for Open Data Enterprise", banner: 'Banner_CODE', slim: 'Banner_CODE_Slim', logo: IMAGE_SERVER + "Code_Logo.png", primary: "#0F084E" },
      // { option: "Collaborating for Resilience", banner: 'Banner_CORE', slim: 'Banner_CORE_Slim', logo: IMAGE_SERVER + "Core_Logo.png", primary: "#483D69" },
      // { option: "Development Gateway", banner: 'Banner_DG', slim: 'Banner_DG_Slim', logo: IMAGE_SERVER + "DG_Logo.png", primary: "#0193D3" },
      // { option: "Dullah Omar Institute", banner: 'Banner_DOI', slim: 'Banner_DOI_Slim', logo: IMAGE_SERVER + "DOI_Logo.png", primary: "#1E2E5A" },
      // { option: "Feedback Labs", banner: 'Banner_Feedback', slim: 'Banner_Feedback_Slim', logo: IMAGE_SERVER + "Feedback_Logo.png", primary: "#3598DB" },
      // { option: "Global Integrity", banner: 'Banner_GI', slim: 'Banner_GI_Slim', logo: IMAGE_SERVER + "GI_Logo.png", primary: "#5A5855" },
      // { option: "Open Government Partnership", banner: 'Banner_OGP', slim: 'Banner_OGP_Slim', logo: IMAGE_SERVER + "OGP_Logo.png", primary: "#000000" },
      // { option: "Pact", banner: 'Banner_Pact', slim: 'Banner_Pact_Slim', logo: IMAGE_SERVER + "Pact_Logo.png", primary: "#74005F" },
      // { option: "PSAM", banner: 'Banner_PSAM', slim: 'Banner_PSAM_Slim', logo: IMAGE_SERVER + "PSAM_Logo.png", primary: "#8181A1" },
      // { option: "Rapid Results Institute", banner: 'Banner_RRI', slim: 'Banner_RRI_Slim', logo: IMAGE_SERVER + "RRI_Logo.png", primary: "#990000" },
      // { option: "Open Gov Hub", banner: 'OGH', slim: 'OGH_Slim', logo: IMAGE_SERVER + "govhub_logo_small.png", rightLogo: IMAGE_SERVER + "govhub_bubbles70.png", primary: "#6995c2" },
    ]
  },
  getters: {
    getTheme: state => state.theme,
    getThemeOptions: state => state.themeOptions,
    getGraphics: state => state,
  },
  actions: {
    updateTheme: ({ commit }, payload) => {
      commit("updateTheme", payload)
    }
  },
  mutations: {
    updateTheme: (state, payload) => {
      state.theme = payload
    }
  }
}
