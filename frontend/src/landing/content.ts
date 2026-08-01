export const DOWNLOAD_URL =
  'https://downloads.passm.slope726.in/passm-cli-windows.exe'
export const GITHUB_URL = 'https://github.com/Chandresh726/Passm'

export const demoSessions = {
  init: [
    ['$ passm init', 'command'],
    ['Create a master password:', 'muted'],
    ['Master password: ••••••••••••', 'muted'],
    ['Password manager initialized.', 'success'],
  ],
  add: [
    ['$ passm add github --username octocat', 'command'],
    ['Enter the password: ••••••••••••', 'muted'],
    ['Password entry added successfully.', 'success'],
  ],
  get: [
    ['$ passm get github', 'command'],
    ['Master password: ••••••••••••', 'muted'],
    ['Username: octocat', 'success'],
    ['Password: ••••••••••••', 'success'],
  ],
  list: [
    ['$ passm list', 'command'],
    ['Service: github    Username: octocat', 'success'],
    ['Service: mail      Username: hello@example.com', 'success'],
    ['2 entries · stored locally', 'muted'],
  ],
} as const

export type DemoCommand = keyof typeof demoSessions
