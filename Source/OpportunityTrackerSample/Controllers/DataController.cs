using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Breeze.WebApi;
using OpportunityTrackerSample.Models;
using OpportunityTrackerSample.Filters;

namespace OpportunityTrackerSample.Controllers
{
    [BreezeController]
    [InitializeRepresentatives]
    public class DataController : ApiController
    {
        
        readonly EFContextProvider<RepresentativeContext> _contextProvider =
            new EFContextProvider<RepresentativeContext>();


        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        // GET api/Representatives
        [HttpGet]
        public IQueryable<Representative> Representatives()
        {
            return _contextProvider.Context.Representatives
                                    .Include(r => r.Organization)
                                    .Include(r => r.Contacts.Select(c => c.ContactInfo))
                                    .Include(r => r.Events)
                                    .Include(r => r.Opportunities)
                                    .OrderBy(r => r.Organization.Name);
        }

        
        //// GET api/Representative/5
        //public Representative GetRepresentative(int id)
        //{
        //    Representative representative = _contextProvider.Context.Representatives.Find(id);
        //    if (representative == null)
        //    {
        //        throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
        //    }

        //    return representative;
        //}

        // PUT api/Representative/5
        //public HttpResponseMessage PutRepresentatives(int id, Representative representative)
        //{
        //    if (ModelState.IsValid && id == representative.ID)
        //    {

        //        _contextProvider.Context.Entry(representative).State = System.Data.EntityState.Modified;

        //        try
        //        {
        //            _contextProvider.Context.SaveChanges();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            return Request.CreateResponse(HttpStatusCode.NotFound);
        //        }

        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    else
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest);
        //    }
        //}

        // ~/api/representatives/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        // POST api/Representative
        //public HttpResponseMessage PostRepresentatives(Representative representative)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _contextProvider.Context.Representatives.Add(representative);
        //        _contextProvider.Context.SaveChanges();

        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, representative);
        //        response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = representative.ID }));
        //        return response;
        //    }
        //    else
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest);
        //    }
        //}

        // DELETE api/Representative/5
        //public HttpResponseMessage DeleteRepresentative(int id)
        //{
        //    Representative representative = _contextProvider.Context.Representatives.Find(id);
        //    if (representative == null)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotFound);
        //    }

        //    _contextProvider.Context.Representatives.Remove(representative);

        //    try
        //    {
        //        _contextProvider.Context.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotFound);
        //    }

        //    return Request.CreateResponse(HttpStatusCode.OK, representative);
        //}

        // GET api/Representatives
        //[HttpGet]
        //public IQueryable<Contact> Contacts()
        //{
        //    return _contextProvider.Context.Contacts;
        //}


        //protected override void Dispose(bool disposing)
        //{
        //    _contextProvider.Context.Dispose();
        //    base.Dispose(disposing);
        //}
    }
}