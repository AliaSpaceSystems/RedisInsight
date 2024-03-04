import { t } from 'testcafe';
import { RdiInstancePage } from '../../../../pageObjects/rdi-instance-page';
import { AddNewRdiParameters, RdiApiRequests } from '../../../../helpers/api/api-rdi';
import { commonUrl } from '../../../../helpers/conf';
import { MyRedisDatabasePage } from '../../../../pageObjects';
import { RedisOverviewPage } from '../../../../helpers/constants';
import { RdiInstancesListPage } from '../../../../pageObjects/rdi-instances-list-page';
import { BrowserActions } from '../../../../common-actions/browser-actions';
import { DatabaseHelper } from '../../../../helpers';
import { MonacoEditor } from '../../../../common-actions/monaco-editor';

const rdiInstancePage = new RdiInstancePage();
const rdiApiRequests = new RdiApiRequests();
const myRedisDatabasePage = new MyRedisDatabasePage();
const rdiInstancesListPage = new RdiInstancesListPage();
const browserActions = new BrowserActions();
const databaseHelper = new DatabaseHelper();

const rdiInstance: AddNewRdiParameters = {
    name: 'testInstance',
    url: 'http://localhost:4000',
    username: 'username',
    password: 'password'
};

//skip the tests until rdi integration is added
fixture.skip `Add job`
    .meta({ type: 'critical_path', feature: 'rdi' })
    .page(commonUrl)
    .beforeEach(async() => {
        await databaseHelper.acceptLicenseTerms();
        await myRedisDatabasePage.setActivePage(RedisOverviewPage.Rdi);
        await rdiApiRequests.addNewRdiApi(rdiInstance);
        await rdiInstancesListPage.reloadPage();
        await rdiInstancesListPage.clickRdiByName(rdiInstance.name);

    })
    .afterEach(async() => {
        await rdiApiRequests.deleteAllRdiApi();
    });
test('Verify that user can add, edit and delete job', async() => {
    const jobName = 'testJob';
    const jobName2 = 'testJob2';

    await t.click(rdiInstancePage.PipelineManagementPanel.addJobBtn);

    const placeholder =  await rdiInstancePage.PipelineManagementPanel.jobNameInput.getAttribute('placeholder');

    await t.expect(placeholder).eql('Enter job name');

    await t
        .expect(rdiInstancePage.PipelineManagementPanel.applyJobNameBtn.hasAttribute('disabled')).ok('the button is not disabled');
    await t.hover(rdiInstancePage.PipelineManagementPanel.applyJobNameBtn);
    await browserActions.verifyTooltipContainsText('Job name is required', true);

    await t.click(rdiInstancePage.PipelineManagementPanel.cancelJobNameBtn);
    await rdiInstancePage.PipelineManagementPanel.addJob(jobName);

    const elementItem = await rdiInstancePage.PipelineManagementPanel.jobItem.count;
    await t.expect(elementItem).gt(0, 'The job is not added');

    await t.click(rdiInstancePage.PipelineManagementPanel.addJobBtn);
    await t.typeText(rdiInstancePage.PipelineManagementPanel.jobNameInput, jobName);
    await t
        .expect(rdiInstancePage.PipelineManagementPanel.applyJobNameBtn.hasAttribute('disabled')).ok('the button is not disabled');
    await t.hover(rdiInstancePage.PipelineManagementPanel.applyJobNameBtn);
    await browserActions.verifyTooltipContainsText('Job name is already in use', true);
    await t.click(rdiInstancePage.PipelineManagementPanel.cancelJobNameBtn);

    await rdiInstancePage.PipelineManagementPanel.addJob(jobName2);
    let elementItem2 = await rdiInstancePage.PipelineManagementPanel.jobItem.count;
    await t.expect(elementItem + 1).eql(elementItem2, 'the 2d job has not be added');

    await rdiInstancePage.PipelineManagementPanel.deleteJobByName(jobName2);
    elementItem2 = await rdiInstancePage.PipelineManagementPanel.jobItem.count;
    await t.expect(elementItem).eql(elementItem2, 'the 2d job has not be deleted');

    await rdiInstancePage.PipelineManagementPanel.editJobByName(jobName, jobName2);
    await rdiInstancePage.PipelineManagementPanel.openJobByName(jobName2);

    await t.expect(rdiInstancePage.PipelineManagementPanel.jobsPipelineTitle.textContent).eql(jobName2);
});
test('Verify that user can add, edit and delete job', async() => {
    const jobName = 'testJob';
    const textForMonaco = 'here should be a job';

    await rdiInstancePage.PipelineManagementPanel.addJob(jobName);
    let text = await MonacoEditor.getTextFromMonaco();
    await t.expect(text).eql('', 'monacoEditor for the job is not empty');
    await MonacoEditor.sendTextToMonaco(rdiInstancePage.jobsInput, textForMonaco, false);
    text = await MonacoEditor.getTextFromMonaco();
    await t.expect(text).eql(textForMonaco, 'user can not enter a text');
});
