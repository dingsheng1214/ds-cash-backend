import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

// 读取项目配置
export const getConfig = () => {
  const environment = process.env.NODE_ENV;
  const projectPath = process.cwd();
  const yamlPath = path.join(projectPath, `./.config/${environment}.yml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
