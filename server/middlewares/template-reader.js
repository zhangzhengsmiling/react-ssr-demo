import promisify from "../../utils/promisify";
import fs from 'fs';
import config from '../config';

const readFilePromise = promisify(fs.readFile);
// 读取模板文件template
const tempalteReader = readFilePromise(config.templatePath)
  .then(data => data.toString());

export default tempalteReader;
