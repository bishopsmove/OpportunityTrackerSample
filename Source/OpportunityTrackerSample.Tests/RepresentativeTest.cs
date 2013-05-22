using OpportunityTrackerSample.Entities.Models;
using OpportunityTrackerSample.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;

namespace OpportunityTrackerSample.Tests
{
    
    
    /// <summary>
    ///This is a test class for RepresentativeTest and is intended
    ///to contain all RepresentativeTest Unit Tests
    ///</summary>
    [TestClass()]
    public class RepresentativeTest
    {


        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Additional test attributes
        // 
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //Use ClassCleanup to run code after all tests in a class have run
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //Use TestInitialize to run code before running each test
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion


        /// <summary>
        ///A test for Representative Constructor
        ///</summary>
        // TODO: Ensure that the UrlToTest attribute specifies a URL to an ASP.NET page (for example,
        // http://.../Default.aspx). This is necessary for the unit test to be executed on the web server,
        // whether you are testing a page, web service, or a WCF service.
        [TestMethod()]
       // [HostType("ASP.NET")]
        //[AspNetDevelopmentServerHost("D:\\Repos\\GitRepo2\\OpportunityTrackerSample\\Source\\OpportunityTrackerSample", "/")]
        //[UrlToTest("http://localhost:6550/breeze/representatives/metadata")]
        public void RepresentativeConstructorExistsTest()
        {
            Representative target = new Representative();
            DataController _controller = new DataController();
            
            Assert.IsTrue(_controller.Representatives().ElementType == typeof(Representative), "Representative Controller return is not of type Representative");

           // Assert.Inconclusive("TODO: Implement code to verify target");
        }
    }
}
