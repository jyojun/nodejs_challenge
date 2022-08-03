export function physical(data) {
  const sixteen_bits = [];

  data.forEach((d) =>
    JSON.stringify(d)
      .split("")
      .map((d) => sixteen_bits.push(d.charCodeAt().toString(16)))
  );
  return sixteen_bits;
}
