using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OpportunityTrackerSample.Entities.Models
{
    public class Comment: EntityBase
    {
        string Brief { get; set; }
        string Body { get; set; }

        public int CommentUserID { get; set; }
        [ForeignKey("CommentUserID")]
        public User CommentUser { get; set; }
    }
}
