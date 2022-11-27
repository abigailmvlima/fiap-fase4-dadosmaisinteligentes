function percorreHTML(html) {
  var lista = [];
  var titulos = html.split('<b>->');

  for (var i = 1; i < titulos.length; i++) {
    var dados = {};

    // percorrendo cada registroÍ
    var registro = titulos[i];

    // pegar cidade
    var nomeCidade = registro.split('</b>');
    var label = nomeCidade[0].split('Roteiros para ');
    dados.cidade = label[1];

    // pegar roteiros
    var arRoteiros = registro.split('<br>#Roteiro A | ');
    var arRoteiroDescricao = arRoteiros[1].split('<br>#Roteiro B');
    var roteiroDescricao = arRoteiroDescricao[0].split(`<br>`);
    var locais = roteiroDescricao[1].replaceAll(';', ',');
    dados.roteiro = roteiroDescricao[0].replace('Região: ', '');
    dados.roteiroLocais = locais;

    var arLocais = locais.split(', ');
    dados.locaisQtde = arLocais.length;

    if (label[1] === 'São Paulo') {
      var arPontos = registro.split('| Região: Centro');
      arPontos = arPontos[1].split('<br>#Roteiro');
      arPontos = arPontos[0].replace('<br>', '').replaceAll(';', ',');
      dados.pontosTuristicos = arPontos;
    } else if (label[1] === 'Las Vegas') {
      var arPontos = registro.split('| Região: Downtown');
      arPontos = arPontos[1].split('<br>#Roteiro');
      arPontos = arPontos[0].replace('<br>', '').replaceAll(';', ',');
      dados.pontosTuristicos = arPontos;
    }

    lista.push(dados);
  }

  return lista;
}

function montaTela(dados) {
  var res = '';
  for (let i = 0; i < dados.length; i++) {
    const element = dados[i];
    res += '<div class="box">';

    res += '<div class="linha">';
    res += '<div class="label">Cidade</div>';
    res += '<div class="cidade">' + element.cidade + '</div>';
    res += '</div>';

    res += '<div class="linha">';
    res += '<div class="label">Roteiro A</div>';
    res += '<div class="roteiro">' + element.roteiro + '</div>';
    res += '</div>';

    res += '<div class="linha">';
    res += '<div class="label">Locais Roteiro A</div>';
    res += '<div class="locais">' + element.roteiroLocais + '</div>';
    res += '</div>';

    res += '<div class="linha">';
    res += '<div class="label">Qtde locais Roteiro A</div>';
    res += '<div class="locaisQtde">' + element.locaisQtde + '</div>';
    res += '</div>';

    if (element.pontosTuristicos) {
      res += '<div class="linha">';
      res += '<div class="label">Ponto Turistico</div>';
      res +=
        '<div class="pontosTuristicos">' + element.pontosTuristicos + '</div>';
      res += '</div>';
    }

    res += '</div>';
  }
  $('#tarefa').html(res);
}
