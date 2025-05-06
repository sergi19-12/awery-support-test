import { test, expect } from "@playwright/test";
import { SupportRequestPage } from "../pages/SupportRequestPage";
import { faker } from '@faker-js/faker';

test('should submit a request and check response status + payload', async ({ page }) => {
  const supportPage = new SupportRequestPage(page);
  await page.goto('/support');

  // Зберігаємо Faker-дані
  const problemDescription = faker.lorem.sentence();
  const email = faker.internet.email();
  const whenItStarted = 'Сьогодні';
  const stepsToRecreate = `${faker.hacker.verb()}, ${faker.hacker.phrase()}`;
  const companyName = faker.company.name();
  const fullName = faker.person.fullName();
  const phone = faker.phone.number('###-###-####');
  const bestTime = 'Будь-який час';
  const browser = faker.internet.userAgent();
  const flashVersion = `${faker.number.int({ min: 10, max: 32 })}.0`;

  //Заповнюємо форму до сабміту
  await supportPage.fillProblemDescription(problemDescription);
  await supportPage.fillEmail(email);
  await supportPage.fillWhenItStarted(whenItStarted);
  await supportPage.fillStepsToRecreate(stepsToRecreate);
  await supportPage.fillCompanyName(companyName);
  await supportPage.fillFullName(fullName);
  await supportPage.fillPhone(phone);
  await supportPage.fillBestTimeToFollowUp(bestTime);
  await supportPage.fillTypeYourBrowser(browser);
  await supportPage.fillFlashPlayerVersion(flashVersion);

  //Очікуємо запит і відповідь під час кліку
  const [request, response] = await Promise.all([
    page.waitForRequest(req =>
      req.url().includes('/support') && req.method() === 'POST'
    ),
    page.waitForResponse(res =>
      res.url().includes('/support') && res.request().method() === 'POST'
    ),
    supportPage.clickSendRequestButton(),
  ]);

  // Статус-код
  const status = response.status();
  console.log('📥 Response status:', status);

  if (status === 200) {
    await expect(page.getByText('Ваш запит успішно надіслано.')).toBeVisible();
  } else {
    await page.screenshot({ path: `error-status-${status}.png`, fullPage: true });
    throw new Error(`Unexpected Status Code: ${status}`);
  }

  //Перевірка Payload
  const payload = request.postDataJSON();
  expect(payload).toMatchObject({
    problemDescription,
    email,
    whenItStarted,
    stepsToRecreate,
    companyName,
    fullName,
    phone,
    bestTimeToFollowUp: bestTime,
    browser,
    flashPlayerVersion: flashVersion,
  });
});
