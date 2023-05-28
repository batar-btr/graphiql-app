import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();

  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something gone wrong';

  return (
    <div id="error-page">
      <h1>{t('oops')}</h1>
      <p>{t('errorDescription')}</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
