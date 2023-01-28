const { writeFileSync } = require("fs");

const main = () => {
  const envs = process.env;
  const lines = [];
  Object.entries(envs).map(([key, val]) => {
    const line = `export ${key}=${val}`;
    lines.push(line);
  });
  const memo = lines.join("\n");
  writeFileSync("./envValMemo.sh", memo);
};

main();
