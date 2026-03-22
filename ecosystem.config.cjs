module.exports = {
  apps: [{
    name: 'tarmac-web',
    cwd: '/var/www/tarmac.musicsian.com/current',
    script: 'npm',
    args: 'start',

    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 5000,
    exp_backoff_restart_delay: 1000,

    max_memory_restart: '500M',

    error_file: '/var/log/tarmac-web/error.log',
    out_file: '/var/log/tarmac-web/out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

    env: {
      NODE_ENV: 'production',
      PORT: 3003
    }
  }]
};
