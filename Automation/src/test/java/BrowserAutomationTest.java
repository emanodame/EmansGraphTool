import org.junit.Test;
import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;

import java.util.ArrayList;

import static junit.framework.TestCase.assertTrue;

public class BrowserAutomationTest {
    private final static WebDriver driver = new FirefoxDriver();
    private final static Actions builder = new Actions(driver);
    private final static JavascriptExecutor js = (JavascriptExecutor) driver;


    @BeforeClass
    public static void init() {
        System.setProperty("webdriver.chrome.driver", "/Users/emanodame/Google Drive/University Work/FINAL YEAR WOWOWOWW/EmansGraphTool/Automation/chromedriver");
        System.setProperty("webdriver.gecko.driver", "/Users/emanodame/Google Drive/University Work/FINAL YEAR WOWOWOWW/EmansGraphTool/Automation/geckodriver");

        final ChromeOptions options = new ChromeOptions();
        options.addArguments("disable-infobars");

        driver.get("https://emanodame.github.io/Graph-Algorithm-Tool/graph.html");
    }

    @Test
    public void testSequence() throws InterruptedException {
        leftClickAddNodeTest();
        edgeCreation();
        rightClickRemoveNodeTest();
        clearGraphButtonTest();
        randomButtonTest();
        exportButtonTest();
        importButtonTest();
    }

    private void leftClickAddNodeTest() {
        //add two nodes in different positions by left clicking
        builder.moveByOffset(0, 0)
                .click()
                .moveByOffset(100, 100)
                .click()
                .build()
                .perform();

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.nodes()");
        assertTrue(jsReturnObject.size() == 2);
    }

    private void edgeCreation() {
        //create edge for the two nodes by shift left clicking
        builder.sendKeys(Keys.SHIFT)
                .click()
                .moveByOffset(-100, -100)
                .click()
                .build()
                .perform();

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.edges()");
        assertTrue(jsReturnObject.size() == 1);
    }

    private void rightClickRemoveNodeTest() {
        //remove a node by simulating right click
        builder.contextClick()
                .build()
                .perform();

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.nodes()");
        assertTrue(jsReturnObject.size() == 1);
    }

    private void clearGraphButtonTest() throws InterruptedException {
        js.executeScript("showSlider()");
        Thread.sleep(1000);

        //left click clear graph button
        driver.findElement(By.id("clear-button")).click();
        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.nodes()");
        assertTrue(jsReturnObject.size() == 0);
    }

    private void randomButtonTest() throws InterruptedException {
        //left click randomButton
        driver.findElement(By.id("random-graph-button")).click();
        Thread.sleep(4000);
        js.executeScript("return hideSlider()");
        js.executeScript("return $.iGrowl.prototype.dismissAll('all')");
        Thread.sleep(2000);
        driver.findElement(By.id("number-text-input")).sendKeys(String.valueOf(""));
        driver.findElement(By.id("number-text-input")).sendKeys(String.valueOf(9));
        driver.findElement(By.id("number-graph-submit-btn")).click();

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.nodes()");
        assertTrue(jsReturnObject.size() > 0);
    }

    private void exportButtonTest() {
        js.executeScript("exportJson()");

        //export json and save to string
        final String graphJsonString = driver.findElement(By.id("json-text-output")).getAttribute("value");
        assertTrue(!graphJsonString.isEmpty());
    }

    private void importButtonTest() {
        final String graphJsonString = driver.findElement(By.id("json-text-output")).getAttribute("value");

        js.executeScript("clearGraph()");
        js.executeScript("importJson()");

        //input json import string
        driver.findElement(By.id("json-text-input")).sendKeys(graphJsonString);

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return sigmaInstance.graph.nodes()");
        assertTrue(jsReturnObject.size() == 0);
    }

    @AfterClass
    public static void cleanUp() {
        driver.close();
    }
}