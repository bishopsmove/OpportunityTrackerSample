﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace OpportunityTrackerSample.Models
{
    public class Representative
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifiedDate { get; set; }


        public virtual ICollection<Contact> Contacts { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<Opportunity> Opportunities { get; set; }


    }
}