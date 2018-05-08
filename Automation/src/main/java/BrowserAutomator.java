import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import sun.jvm.hotspot.utilities.Assert;

import java.util.ArrayList;

public class BrowserAutomator {
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "/Users/emanodame/Google Drive/University Work/FINAL YEAR WOWOWOWW/EmansGraphTool/Automation/chromedriver");

        final ChromeOptions options = new ChromeOptions();
        options.addArguments("disable-infobars");

        final WebDriver driver = new ChromeDriver();
        driver.get("file:/Users/emanodame/Google Drive/University Work/FINAL YEAR WOWOWOWW/EmansGraphTool/index.html");

        final JavascriptExecutor js = (JavascriptExecutor) driver;
        final Actions builder = new Actions(driver);

        //Generate two nodes in different positions
        builder.moveByOffset(0, 0)
                .click()
                .moveByOffset(100, 100)
                .click()
                .build()
                .perform();

        final ArrayList<Object> jsReturnObject = (ArrayList<Object>) js.executeScript("return s.graph.nodes()");

        //Test that two nodes are generated
        

        Thread.sleep(5000);
        driver.close();


    }
}
