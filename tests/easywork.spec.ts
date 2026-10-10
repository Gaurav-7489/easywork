import { test,expect } from '@playwright/test';
test('worker can inspect Deventure shift and join lobby',async({page})=>{await page.goto('/');await expect(page.getByText('Your next ODC is already taking shape.')).toBeVisible();await page.getByRole('button',{name:/Banquet & Guest Service Crew/}).first().click();await expect(page.getByRole('heading',{name:'Banquet & Guest Service Crew'})).toBeVisible();await page.getByRole('button',{name:/JOIN ODC LOBBY|LOBBY JOINED/}).click();await expect(page.getByText('Waiting for business confirmation',{exact:true})).toBeVisible()});
test('hotel can create and publish a shift',async({page})=>{await page.goto('/');await page.getByRole('button',{name:/Demo account/}).click();await page.getByRole('button',{name:'Business'}).click();await expect(page.getByRole('heading',{name:'Hotel staffing, sorted.'})).toBeVisible();await page.getByRole('button',{name:/New ODC/}).click();await page.getByLabel('Shift title').fill('Evening service test');await page.getByRole('button',{name:/Publish demo ODC/}).click();await expect(page.getByText('Evening service test')).toBeVisible()});
test('hotel funding gate and approval are operational',async({page})=>{await page.goto('/');await page.getByRole('button',{name:/Demo account/}).click();await page.getByRole('button',{name:'Business'}).click();await page.getByRole('button',{name:'Worker Lobby'}).click();await expect(page.getByRole('button',{name:'Fund shift first'})).toBeDisabled();await page.getByRole('button',{name:'Go to funding'}).click();await page.getByRole('button',{name:/Simulate deposit/}).click();await page.getByRole('button',{name:'Worker Lobby'}).click();await page.getByRole('button',{name:'Confirm workers'}).click();await expect(page.getByRole('button',{name:'Workers confirmed'})).toBeDisabled()});
test('admin transport board is available',async({page})=>{await page.goto('/');await page.getByRole('button',{name:/Demo account/}).click();await page.getByRole('button',{name:'Admin'}).click();await expect(page.getByRole('heading',{name:/Every shift. Every ride. Every payout./})).toBeVisible();await page.getByRole('button',{name:'Transport Dispatch'}).click();await expect(page.getByRole('heading',{name:/Pickup & return coordination/})).toBeVisible()});
for(const width of [390,768,1440])test('viewport '+width+' has no horizontal overflow',async({page})=>{await page.setViewportSize({width,height:900});await page.goto('/');const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));expect(dims.scroll).toBeLessThanOrEqual(dims.client+1)});

test('role switching never preserves an invalid portal page',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:'Business'}).click();
 await page.getByRole('button',{name:'Create ODC'}).click();
 await expect(page.getByRole('heading',{name:'Create a Deventure ODC'})).toBeVisible();
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:'Admin'}).click();
 await expect(page.getByRole('heading',{name:'Every shift. Every ride. Every payout.'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'From a funded shift to a safe ride home.'})).toBeVisible();
});
test('simulated hotel deposit survives refresh and can be reset',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:'Business'}).click();
 await page.getByRole('button',{name:'Funding & Payments'}).click();
 await page.getByRole('button',{name:/Simulate deposit/}).click();
 await expect(page.getByRole('button',{name:'Demo deposit recorded'})).toBeDisabled();
 await page.reload();
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:'Business'}).click();
 await page.getByRole('button',{name:'Funding & Payments'}).click();
 await expect(page.getByRole('button',{name:'Demo deposit recorded'})).toBeDisabled();
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:/Reset demonstration/}).click();
 await page.getByRole('button',{name:'Demo account'}).click();
 await page.getByRole('button',{name:'Business'}).click();
 await page.getByRole('button',{name:'Funding & Payments'}).click();
 await expect(page.getByRole('button',{name:/Simulate deposit/})).toBeEnabled();
});

test('mobile worker menu reaches Safety and Profile without hidden actions',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/');
 await page.getByRole('button',{name:'Open worker menu'}).click();
 await page.getByRole('button',{name:'Safety',exact:true}).click();
 await expect(page.getByRole('heading',{name:'A clear way to ask for help.'})).toBeVisible();
 await page.getByRole('button',{name:'Open worker menu'}).click();
 await page.getByRole('button',{name:'Profile',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Your details. Your next opportunity.'})).toBeVisible();
});
