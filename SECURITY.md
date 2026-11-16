# Security policy

This is a research prototype that shows fixed example data. It is not a clinical tool.

## Reporting a vulnerability

Please report security problems privately through GitHub: open the Security tab of this repository and choose "Report a vulnerability". Do not open a public issue for a vulnerability.

Do not include patient data or credentials in a report.

## Supported version

Only the version tagged `v1.0-saip` and the current `main` branch are supported.

## Backend settings

The Django settings contain a placeholder secret key for local development. Set `DJANGO_SECRET_KEY` and `DJANGO_DEBUG=false` before running the backend anywhere public.
