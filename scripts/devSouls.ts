import * as dotenv from 'dotenv';
import { exec } from 'child_process';
import { argv } from 'process';
import { souls } from './souls'

dotenv.config();

let commands = argv.slice(2);
if (commands.length === 0) {
  console.error('No soul arguments in package.json provided.');
  console.error('Using souls in souls.ts.');
  commands = Object.keys(souls);
  if (commands.length === 0) {
    console.error('No souls in souls');
    process.exit(1);
  }
}

console.log('commands', commands);

commands.forEach((command) => {

  const id = process.env.NEXT_PUBLIC_SOUL_ENGINE_DEV === 'true' ? '--id dev' : '';
  const local = process.env.NEXT_PUBLIC_SOUL_ENGINE_LOCAL === 'true' ? '-l' : '';
  const noOpen = '-n';
  const once = process.env.NEXT_PUBLIC_SOUL_ENGINE_DEV === 'true' ? '' : '-o';

  const fullCommand = `cd ./packages/${command} && npx soul-engine dev ${id} ${noOpen} ${local}`;
  console.log(fullCommand);

  const child = exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });

  if (child.stdout) {
    child.stdout.on('data', (data) => {
      console.log(`Stdout: ${data}`);
    });
  }

  if (child.stderr) {
    child.stderr.on('data', (data) => {
      console.error(`Stderr: ${data}`);
    });
  }
});
