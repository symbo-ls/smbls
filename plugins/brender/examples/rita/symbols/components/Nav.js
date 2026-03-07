// ─── Nav ────────────────────────────────────────────────────────────────────

export const Nav = {
  extends: 'Flex',
  tag: 'nav',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '1000',
  height: '60px',
  background: 'navBg',
  style: { backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' },
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'borderLight',
  transition: 'border-color 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',

  Inner: {
    extends: 'Flex',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100%',
    flexAlign: 'center space-between',
    padding: '0 48px',
    width: '100%',
    '@tablet': { padding: '0 24px' },

    Logo: {
      extends: 'Link',
      href: '/',
      fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif",
      fontSize: '15px',
      fontWeight: '600',
      letterSpacing: '-0.02em',
      color: 'dark',
      transition: 'opacity 140ms cubic-bezier(0.0, 0.0, 0.2, 1)',
      ':hover': { opacity: '0.4' },
      text: "Hi, I'm Rita Katona"
    },

    Links: {
      extends: 'Flex',
      flexAlign: 'center center',
      gap: '32px',
      '@mobile': { display: 'none' },

      About: {
        extends: 'Link',
        href: '/about',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'About'
      },
      Coaching: {
        extends: 'Link',
        href: '/from-workshops-to-1-on-1s',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Coaching'
      },
      Freelance: {
        extends: 'Link',
        href: '/hire-me-as-a-freelancer',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Freelance'
      },
      Angel: {
        extends: 'Link',
        href: '/angel-investment',
        fontSize: '13px',
        fontWeight: '400',
        color: 'textTertiary',
        transition: 'color 120ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        ':hover': { color: 'dark' },
        text: 'Angel'
      },
      CTA: {
        extends: 'Link',
        href: '#contact',
        fontSize: '12px',
        fontWeight: '500',
        color: 'white',
        padding: '7px 18px',
        background: 'accent',
        borderRadius: '6px',
        transition: 'background 200ms cubic-bezier(0.16, 1, 0.3, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        ':hover': { background: 'accentHover', transform: 'translateY(-1px)', boxShadow: '0 4px 16px rgba(85,127,177,0.3)' },
        ':active': { transform: 'scale(0.96) translateY(0)', boxShadow: 'none' },
        text: 'Get in touch'
      }
    },

    Hamburger: {
      tag: 'button',
      display: 'none',
      '@mobile': { display: 'flex' },
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      width: '40px',
      height: '40px',
      background: 'transparent',
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: 'transparent',
      cursor: 'pointer',
      padding: '0',
      attr: { id: 'nav-hamburger', onclick: 'toggleMobileMenu()', 'aria-label': 'Toggle navigation' },

      L1: {
        width: '22px',
        height: '2px',
        background: 'dark',
        borderRadius: '1px',
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        attr: { id: 'hb-l1' }
      },
      L2: {
        width: '22px',
        height: '2px',
        background: 'dark',
        borderRadius: '1px',
        transition: 'opacity 200ms ease',
        attr: { id: 'hb-l2' }
      },
      L3: {
        width: '22px',
        height: '2px',
        background: 'dark',
        borderRadius: '1px',
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        attr: { id: 'hb-l3' }
      }
    }
  },

  MobileMenu: {
    attr: { id: 'nav-mobile-menu' },
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'cream',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'borderLight',
    display: 'none',
    flexDirection: 'column',
    padding: '4px 24px 24px',
    style: { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },

    MAbout:     { extends: 'MobileNavLink', href: '/about', text: 'About' },
    MCoaching:  { extends: 'MobileNavLink', href: '/from-workshops-to-1-on-1s', text: 'Coaching' },
    MFreelance: { extends: 'MobileNavLink', href: '/hire-me-as-a-freelancer', text: 'Freelance' },
    MAngel:     { extends: 'MobileNavLink', href: '/angel-investment', text: 'Angel' },
    MRefs:      { extends: 'MobileNavLink', href: '/references-and-partners', text: 'References' },

    MDivider: {
      height: '1px',
      background: 'borderLight',
      margin: '8px 0 12px'
    },

    MCTA: {
      extends: 'Link',
      href: '#contact',
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: 'white',
      padding: '13px 20px',
      background: 'accent',
      borderRadius: '8px',
      textAlign: 'center',
      transition: 'background 200ms ease',
      ':hover': { background: 'accentHover' },
      text: 'Get in touch',
      attr: { onclick: 'closeMobileMenu()' }
    }
  },

  NavScript: {
    tag: 'script',
    text: `(function(){var _o=false;function _show(){var m=document.getElementById('nav-mobile-menu');if(!m)return;m.style.display='flex';document.getElementById('hb-l1').style.transform='translateY(7px) rotate(45deg)';document.getElementById('hb-l2').style.opacity='0';document.getElementById('hb-l3').style.transform='translateY(-7px) rotate(-45deg)';_o=true;}function _hide(){var m=document.getElementById('nav-mobile-menu');if(!m)return;m.style.display='none';document.getElementById('hb-l1').style.transform='';document.getElementById('hb-l2').style.opacity='';document.getElementById('hb-l3').style.transform='';_o=false;}window.toggleMobileMenu=function(){_o?_hide():_show();};window.closeMobileMenu=function(){_hide();};document.addEventListener('click',function(e){if(!_o)return;var m=document.getElementById('nav-mobile-menu');var b=document.getElementById('nav-hamburger');if(m&&b&&!m.contains(e.target)&&!b.contains(e.target))_hide();});})();`
  }
}

export const MobileNavLink = {
  extends: 'Link',
  display: 'block',
  padding: '13px 0',
  fontSize: '15px',
  fontWeight: '400',
  letterSpacing: '-0.01em',
  color: 'dark',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'borderLight',
  transition: 'opacity 120ms ease',
  ':hover': { opacity: '0.5' },
  attr: { onclick: 'closeMobileMenu()' }
}
