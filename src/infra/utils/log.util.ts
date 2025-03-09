import * as fs from 'fs';
import * as path from 'path';

export abstract class LogUtil {
  static async logRequest(request: any, response: any): Promise<void> {
    const dateTime: number = Date.now();
    const content = {
      dateTime,
      request,
      response,
    };
    const logsDirectory: string = path.join(
      __dirname,
      process.env.FILES_SUB_PATH,
      'logs',
    );
    const filePath: string = path.join(logsDirectory, `${dateTime}.json`);

    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory, { recursive: true });
    }

    fs.writeFile(filePath, JSON.stringify(content), (err): void => {
      if (err) console.log(err);
    });
  }
}
