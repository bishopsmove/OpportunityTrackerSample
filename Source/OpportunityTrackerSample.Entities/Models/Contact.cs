﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Entities.Models
{
    public class Contact : EntityBase
    {
        public Contact()
        {
            this.ContactInfo = new HashSet<ContactInfo>();
        }

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public override int ID
        {
            get;
            set;
        }
        
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string DisplayName { get; set; }

        public virtual int Rating { get; set; }


        [InverseProperty("AssociatedContact")]
        public virtual ICollection<ContactInfo> ContactInfo { get; set; }

        public int? RepID { get; set; }
        [ForeignKey("RepID")]
        public Representative AssociatedRep { get; set; }

        
        
        public virtual int? UserID { get; set; }
        [InverseProperty("UserContact")]
        public virtual User ContactUser {get; set;}

        public virtual int? CollegueID { get; set; }
        [ForeignKey("ID")]
        public virtual Colleagues Colleagues { get; set; }

        //public virtual ICollection<Representative> Representatives { get; set; }

        

    }
}
