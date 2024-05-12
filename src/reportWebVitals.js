const reportWebVitals = onPerfRequirement => {
  if (onPerfRequirement && onPerfRequirement instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfRequirement);
      getFID(onPerfRequirement);
      getFCP(onPerfRequirement);
      getLCP(onPerfRequirement);
      getTTFB(onPerfRequirement);
    });
  }
};

export default reportWebVitals;
