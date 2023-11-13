import {test, expect} from "@playwright/test"
import { Common } from '../pages/common';
import { LoginPage } from '../pages/sauceLabsLogin';

let common
let login

test.describe('Saucelabs testing', () => {

    test.beforeEach(async ({page}) => {
        common = new Common(page);
        login = new LoginPage(page);
        await common.loadToPage()

    })

    test('Log in', async ({page}) => {
        
    })


})