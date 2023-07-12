const config = {

    theme: {

        extend: {
            
            screens: {

                mobile: '480px',
                tablet: '768px',
                desktop: '1280px',

            },

            boxShadow: {
                modal: '0px 0px 15px rgba(0, 0, 0, 0.1)',
            },

            borderRadius: {
                control: "var(--kloktun-control-rounded, 0.75rem)",
                modal: "var(--kloktun-modal-rounded, 1.5rem)"
            },

            colors: {
                stroke: {
                    DEFAULT: "rgba(var(--kloktun-stroke, 229, 231, 235), <alpha-value>)"
                },
            
                front: {
                    DEFAULT: "rgba(var(--kloktun-front, 64, 64, 64), <alpha-value>)",
                    hint: "rgba(var(--kloktun-front-hint, 170, 170, 170), <alpha-value>)",
                },
            
                background: {
                    DEFAULT: "rgba(var(--kloktun-background, 255, 255, 255), <alpha-value>)",
                    body: "rgba(var(--kloktun-background-body, 255, 255, 255), <alpha-value>)",
                    backdrop: "rgba(var(--kloktun-background-backdrop, 255, 255, 255), <alpha-value>)",
                    hover: "rgba(var(--kloktun-background-hover, 250, 250, 250), <alpha-value>)",
                    active: "rgba(var(--kloktun-background-active, 249, 249, 249), <alpha-value>)",
                },
            
                primary: {
                    DEFAULT: "rgba(var(--kloktun-primary, 145,96,248), <alpha-value>)",
                    front: "rgba(var(--kloktun-primary-front, 255,255,255), <alpha-value>)",
                    hover: "rgba(var(--kloktun-primary-hover, 244, 239, 254), <alpha-value>)",
                    active: "rgba(var(--kloktun-primary-active, 233, 223, 253), <alpha-value>)",
                    light: {
                        DEFAULT: "rgba(var(--kloktun-primary-light, 195, 167, 255), <alpha-value>)"
                    },
                    accent: {
                        hover: "rgba(var(--kloktun-primary-accent-hover, 167, 128, 249), <alpha-value>)",
                        active: "rgba(var(--kloktun-primary-accent-active, 139, 85, 253), <alpha-value>)"
                    },
                    plain: {
                        DEFAULT: "rgba(var(--kloktun-primary-plain, 244, 239, 254), <alpha-value>)",
                        hover: "rgba(var(--kloktun-primary-plain-hover, 235, 225, 255), <alpha-value>)",
                        active: "rgba(var(--kloktun-primary-plain-active, 242, 235, 255), <alpha-value>)"
                    }
                },
            
                error: {
                    DEFAULT: "rgba(var(--kloktun-error, 241, 105, 105), <alpha-value>)",
                    front: "rgba(var(--kloktun-error-front, 255, 255, 255), <alpha-value>)",
                    hover: "rgba(var(--kloktun-error-hover, 255, 245, 245), <alpha-value>)",
                    active: "rgba(var(--kloktun-error-active, 255, 238, 238), <alpha-value>)",
                    light: {
                        DEFAULT: "rgba(var(--kloktun-error-light, 255, 236, 239), <alpha-value>)"
                    },
                    accent: {
                        hover: "rgba(var(--kloktun-error-accent-hover, 251, 124, 124), <alpha-value>)",
                        active: "rgba(var(--kloktun-error-accent-active, 242, 93, 93), <alpha-value>)"
                    },
                    plain: {
                        DEFAULT: "rgba(var(--kloktun-error-plain, 255, 236, 239), <alpha-value>)",
                        hover: "rgba(var(--kloktun-error-plain-hover, 255, 232, 235), <alpha-value>)",
                        active: "rgba(var(--kloktun-error-plain-active, 255, 228, 233), <alpha-value>)"
                    }
                },
            
                warning: {
                    DEFAULT: "rgba(var(--kloktun-warning, 248, 151, 96), <alpha-value>)",
                    front: "rgba(var(--kloktun-warning-front, 255, 255, 255), <alpha-value>)",
                    hover: "rgba(var(--kloktun-warning-hover, 255, 246, 241), <alpha-value>)",
                    active: "rgba(var(--kloktun-warning-active, 255, 240, 232), <alpha-value>)",
                    accent: {
                        hover: "rgba(var(--kloktun-warning-accent-hover, 255, 167, 117), <alpha-value>)",
                        active: "rgba(var(--kloktun-warning-accent-active, 242, 136, 76), <alpha-value>)"
                    },
                    plain: {
                        DEFAULT: "rgba(var(--kloktun-warning-plain, 255, 243, 237), <alpha-value>)",
                        hover: "rgba(var(--kloktun-warning-plain-hover, 255, 240, 232), <alpha-value>)",
                        active: "rgba(var(--kloktun-warning-plain-active, 255, 232, 220), <alpha-value>)"
                    }
                },
                
                success: {
                    DEFAULT: "rgba(var(--kloktun-success, 103, 194, 58), <alpha-value>)",
                    front: "rgba(var(--kloktun-success-front, 255, 255, 255), <alpha-value>)",
                    hover: "rgba(var(--kloktun-success-hover, 247, 255, 245), <alpha-value>)",
                    active: "rgba(var(--kloktun-success-active, 239, 255, 235), <alpha-value>)",
                    accent: {
                        hover: "rgba(var(--kloktun-success-accent-hover, 133, 206, 97), <alpha-value>)",
                        active: "rgba(var(--kloktun-success-accent-active, 93, 175, 52), <alpha-value>)"
                    },
                    plain: {
                        DEFAULT: "rgba(var(--kloktun-success-plain, 240, 249, 235), <alpha-value>)",
                        hover: "rgba(var(--kloktun-success-plain-hover, 242, 255, 238), <alpha-value>)",
                        active: "rgba(var(--kloktun-success-plain-active, 228, 255, 221), <alpha-value>)"
                    }
            
                }
            },

        
            variants: {
                opacity: ({ after }) => after(['disabled']),
                cursor: ({ after }) => after(['disabled']),
                extend: {
                  backgroundColor: ['active']
                },
              },
    
        },
      },
      
      plugins: [],

};

module.exports = config;