export const sizeMin = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tabletS: '640px',
  tabletM: '768px',
  laptop: '1000px',
  desktop: '1280px',
}

export const sizeMax = {
  mobileS: '374px',
  mobileM: '424px',
  mobileL: '639px',
  tabletS: '767px',
  tabletM: '999px',
  laptop: '1279px'
}


export const device = {
  mobile: `(max-width: ${sizeMax.mobileL})`,
  tablet: `(min-width: ${sizeMin.tabletS})`
};

