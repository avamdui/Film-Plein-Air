$(function ()
{
      $('#SelectT').change(function (event) {
        
        let nombreT = $(this).val(); /* Récuperer le nombre de place*/
          $('#divBillet').empty();
          $('#divBillet').append('<div data-action="billet" class="Zone-Billet"></div>');
        for (let i = 0; i < (nombreT); i++)
        {
            //$('[data-action=billet]').remove;
            let billetN = ('Billet ' + (i+1))
            let titleHtml = $('<h4>').addClass('col-12 mb-3').text(billetN)
            let billetHtml = ('<hr><div class="Billet-n row"><div class="col-md-6 mb-3"><label for="cc-name">Nom</label><input type="text" class="form-control" id="cc-name" placeholder="" required></div><div class="col-md-6 mb-3"><label for="cc-surname">Prenom</label><input type="text" class="form-control" id="cc-surname" placeholder="" required></div></div></div>')
            $('[data-action=billet]').append(titleHtml).append(billetHtml);

        }
    });

});

